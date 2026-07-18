import Subscriber from "../models/subscriber.model.js";
import transporter from "../config/nodemailer.js";

// Subscribe User
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ success: false, message: "You are already subscribed." });
    }

    await Subscriber.create({ email });
    res.status(201).json({ success: true, message: "Subscribed successfully 🎉" });
  } catch (error) {
    console.error("Subscribe error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get Subscribers
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json({ success: true, subscribers });
  } catch (error) {
    console.error("Get subscribers error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Send Newsletter
export const sendNewsletter = async (req, res) => {
  try {
    const { subject, message } = req.body;
    if (!subject || !message) {
      return res.status(400).json({ success: false, message: "Subject and Message are required" });
    }

    const subscribers = await Subscriber.find();
    for (const subscriber of subscribers) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: subscriber.email,
        subject,
        html: `
          <div style="font-family:Arial;padding:20px">
            <h2 style="color:#16a34a">${subject}</h2>
            <p>${message}</p>
            <br>
            <a href="http://localhost:5173"
               style="background:#16a34a;color:white;padding:12px 20px;text-decoration:none;border-radius:6px;">
               Visit VMart
            </a>
            <p style="margin-top:30px">Thank you ❤️<br><b>VMart Team</b></p>
          </div>
        `,
      });
    }

    res.json({ success: true, message: "Newsletter Sent Successfully" });
  } catch (error) {
    console.error("Newsletter error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Send Offer Mail
export const sendOfferMail = async (req, res) => {
  try {
    const { productName, oldPrice, offerPrice } = req.body;
    if (!productName || !oldPrice || !offerPrice) {
      return res.status(400).json({ success: false, message: "Product details are required" });
    }

    const subscribers = await Subscriber.find();
    for (const subscriber of subscribers) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: subscriber.email,
        subject: `🔥 Special Offer on ${productName}`,
        html: `
          <div style="font-family:Arial;padding:20px">
            <h2 style="color:#16a34a">Limited Time Offer 🎉</h2>
            <h3>${productName}</h3>
            <p>
              <span style="text-decoration:line-through">₹${oldPrice}</span>
              <span style="color:red;font-size:20px;font-weight:bold;margin-left:10px;">₹${offerPrice}</span>
            </p>
            <a href="http://localhost:5173"
               style="background:#16a34a;color:white;padding:12px 20px;text-decoration:none;border-radius:6px;">
               Shop Now
            </a>
          </div>
        `,
      });
    }

    res.json({ success: true, message: "Offer email sent successfully" });
  } catch (error) {
    console.error("Offer mail error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
