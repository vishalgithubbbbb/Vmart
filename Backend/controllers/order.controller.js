import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Stripe from "stripe";
import User from "../models/user.model.js";

// Place order COD
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;
    if (!items || !address) {
      return res.status(400).json({ success: false, message: "Items and address are required" });
    }

    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    amount += Math.floor((amount * 2) / 100); // 2% tax

    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
      status: "Order Placed",
      trackingHistory: [
        { status: "Order Placed", message: "Your order has been placed successfully." }
      ]
    });

    res.status(201).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("COD order error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Place order Stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;
    const { origin } = req.headers;

    if (!items || !address || items.length === 0) {
      return res.status(400).json({ success: false, message: "Items and address are required" });
    }

    let productData = [];
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) throw new Error(`Product not found: ${item.product}`);
      productData.push({ name: product.name, price: product.offerPrice, quantity: item.quantity });
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor((amount * 2) / 100); // 2% tax
    if (amount < 50) {
      return res.status(400).json({
        success: false,
        message: "Minimum order amount for online payment is ₹50. Please add more items or choose COD."
      });
    }

    const order = await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "Online",
      isPaid: false,
      status: "Order Placed",
      trackingHistory: [
        { status: "Order Placed", message: "Your order has been placed successfully." }
      ]
    });

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const line_items = productData.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.floor(item.price * 100), // price in paise, no double tax
      },
      quantity: item.quantity,
    }));

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: { orderId: order._id.toString(), userId },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Stripe order error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Stripe Webhooks
export const stripeWebhooks = async (req, res) => {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const { orderId, userId } = session.metadata;

      await Order.findByIdAndUpdate(orderId, {
        isPaid: true,
        $push: {
          trackingHistory: {
            status: "Processing",
            message: "Payment received. Your order is now being processed."
          }
        },
        status: "Processing"
      });

      await User.findByIdAndUpdate(userId, { cartItems: [] }); // clear cart
      break;
    }
    default:
      console.error(`Unhandled event type ${event.type}`);
      break;
  }

  res.json({ received: true });
};

// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({ userId })
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all orders (admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Monthly sales report
export const monthlySales = async (req, res) => {
  try {

    const sales = await Order.aggregate([

      {
        $group: {

          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },

          totalSales: {
            $sum: "$amount"
          },

          totalOrders: {
            $sum: 1
          }

        }
      },

      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }

    ]);

    const months = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const formatted = sales.map(item => ({

      month: months[item._id.month],

      totalSales: item.totalSales,

      totalOrders: item.totalOrders

    }));

    res.json({

      success: true,

      sales: formatted

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }
};

// Update order tracking status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const allowedStatus = ["Order Placed", "Processing", "Packed", "Shipped", "Delivered", "Cancelled"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const messages = {
      "Order Placed": "Your order has been placed successfully.",
      "Processing": "Seller has started processing your order.",
      "Packed": "Your order has been packed carefully.",
      "Shipped": "Your order has been shipped and is on the way.",
      "Delivered": "Order delivered successfully.",
      "Cancelled": "Your order has been cancelled."
    };

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status;
    order.trackingHistory.push({ status, message: messages[status] });
    await order.save();

    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Track order
export const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("items.product").populate("address");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, tracking: order.trackingHistory, status: order.status });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
