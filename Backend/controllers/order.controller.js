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
    await Order.create({ userId, items, address, amount, paymentType: "COD", isPaid: false });

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
        message: "Minimum order amount for online payment is ₹50. Please add more items or choose COD.",
      });
    }

    const order = await Order.create({ userId, items, address, amount, paymentType: "Online", isPaid: false });

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const line_items = productData.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
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
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;
      const session = await stripeInstance.checkout.sessions.list({ payment_intent: paymentIntentId });
      const { orderId, userId } = session.data[0].metadata;

      await Order.findByIdAndUpdate(orderId, { isPaid: true, status: "Paid" });
      await User.findByIdAndUpdate(userId, { cartItems: {} });
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

// Get all orders for admin
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