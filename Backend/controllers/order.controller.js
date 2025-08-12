import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Stripe from 'stripe';
import User from "../models/user.model.js";

//Place order COD: /api/order/placeOrder

export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;
    if (!items || !address) {
      return res.status(400).json({ message: "Items and address are required", success: false });
    }
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    //Add text charge 2%
    amount += Math.floor((amount * 2) / 100);
    await Order.create({
      userId, items, address, amount, paymentType: "COD", isPaid: false,
    });
    res.status(201).json({
      message: "Order placed Successfully",
      success: true,
    })
  }
  catch (error) {
    console.log("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server Error" })
  }
}


//Place order Stripe: /api/order/stripe

export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;
    const { origin } = req.headers;


    if (!items || !address || items.length === 0) {
      return res.status(400).json({ message: "Items and address are required", success: false });
    }

    let productData = [];
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) throw new Error(`Product not found: ${item.product}`);
  
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor((amount * 2) / 100);
   

    const order = await Order.create({
      userId, items, address, amount, paymentType: "Online",
    });

    //Stripe Gateway Initilaize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    //create line items for stripe
    const line_items = productData.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {name: item.name},
        unit_amount: Math.floor(item.price + item.price * 0.02)*100
      },
      quantity: item.quantity,
    }));
   
    //create session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      }
    });
    
    return res.json({
      success: true,
      url: session.url
    });
  }
  catch (error) {
    console.error("Stripe order error:", error.message, error.stack);
    return res.status(500).json({ success: false, message: error.message });
  }
}  


//Stripe Webhooks to Verify Payment Action : /stripe
export const stripeWebhooks = async (req,res)=>{
 //Stripe Gateway Initialize 
 const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

const sig = req.headers["stripe-signature"];
let event;
try{
  event = stripeInstance.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );
}
catch(error){
  res.status(400).send(`Webhook Error: ${error.message}`)
}

//Handle the event

switch(event.type){
  case "payment_intent.succeeded":{
    const paymentIntent = event.data.object;
    const paymentIntentId = paymentIntent.id

    //Getting Session Metadata
    const session = await stripeInstance.checkout.sessions.list({
      payment_intent:paymentIntentId,
    });
    const {orderId,userId} = session.data[0].metadata;
    
    //Mark Payment as Paid
    await Order.findByIdAndUpdate(orderId,{isPaid:true})

    //Clear user cart
    await User.findByIdAndUpdate(userId, {cartItems:{}});
    break;

  }
    case "payment_intent.succeeded":{
    const paymentIntent = event.data.object;
    const paymentIntentId = paymentIntent.id

    //Getting Session Metadata
    const session = await stripeInstance.checkout.sessions.list({
      payment_intent:paymentIntentId,
    });
    const {orderId} = session.data[0].metadata;
    await Order.findByIdAndDelete(orderId)
    break;

    }

   default:
    console.error(`Unhandled event type ${event.type}`)
    break;
}
res.json({received : true});

}

//order details for individual user :/api/order/user

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    }).populate("items.product").populate("address").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      orders,
    })
  }
  catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

//get all orders for admin :/api/order/seller

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: false }]
    })
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });


    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};
