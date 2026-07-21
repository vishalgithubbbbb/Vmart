import Product from "../models/product.model.js";
import Subscriber from "../models/subscriber.model.js";
import transporter from "../config/nodemailer.js";

// Add Product : /api/product/add-product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, offerPrice, category } = req.body;
    const image = req.files?.map((file) => file.location);

    if (!name || !description || !price || !offerPrice || !category || !image || image.length === 0) {
      return res.status(400).json({ success: false, message: "All fields including images are required" });
    }

    const product = await Product.create({ name, description, price, offerPrice, category, image });

    // Notify subscribers
    const subscribers = await Subscriber.find({}, "email");
    const imageUrl = product.image[0]; 
    const discount = Math.round(((product.price - product.offerPrice) / product.price) * 100);

    for (const subscriber of subscribers) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: subscriber.email,
          subject: `🛒 New Product Added - ${product.name}`,
          html: `
            <div style="max-width:650px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;font-family:Arial;border:1px solid #e5e7eb;">
              <div style="background:#111827;padding:22px;text-align:center;">
                <h1 style="color:#fff;margin:0;font-size:30px;letter-spacing:2px;">VMart</h1>
                <p style="color:#d1d5db;margin-top:8px;">Premium Frozen Products</p>
              </div>
              <div style="background:#16a34a;padding:14px;text-align:center;">
                <h2 style="margin:0;color:white;">🎉 New Product Just Arrived</h2>
              </div>
              <div style="padding:30px;text-align:center;">
                <img src="${imageUrl}" style="width:280px;height:280px;object-fit:cover;border-radius:16px;border:1px solid #ddd;" />
              </div>
              <div style="padding:0 35px 30px;">
                <h2 style="margin:0;color:#111827;">${product.name}</h2>
                <p style="color:#6b7280;margin-top:8px;">${product.description}</p>
                <p style="margin-top:15px;">
                  <span style="background:#dcfce7;color:#15803d;padding:6px 12px;border-radius:30px;font-size:13px;font-weight:bold;">
                    ${product.category}
                  </span>
                </p>
                <div style="margin-top:25px;">
                  <span style="font-size:18px;color:#9ca3af;text-decoration:line-through;">₹${product.price}</span>
                  <span style="font-size:34px;font-weight:bold;color:#16a34a;margin-left:12px;">₹${product.offerPrice}</span>
                  <span style="background:#ef4444;color:white;padding:6px 12px;border-radius:30px;margin-left:15px;font-size:13px;font-weight:bold;">
                    ${discount}% OFF
                  </span>
                </div>
                <div style="margin-top:35px;text-align:center;">
                  <a href="https://food.vishdelivers.shop/product/${encodeURIComponent(product.category.toLowerCase())}/${product._id}" 
                     style="background:#16a34a;color:white;padding:16px 45px;border-radius:8px;font-size:18px;font-weight:bold;text-decoration:none;">
                    🛒 Shop Now
                  </a>
                </div>
              </div>
              <div style="background:#f9fafb;padding:25px;text-align:center;border-top:1px solid #eee;">
                <p style="margin:0;font-size:14px;color:#6b7280;">You're receiving this email because you subscribed to VMart.</p>
                <p style="margin-top:15px;font-size:15px;color:#111827;">❤️ Thank you for shopping with us</p>
                <h3 style="margin-top:10px;color:#16a34a;">VMart Team</h3>
              </div>
            </div>
          `,
        });
      } catch (err) {
        console.error("Email failed for:", subscriber.email, err.message);
      }
    }

    res.status(201).json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Products : /api/product/list
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Get Single Product : /api/product/:id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params; // ✅ use params not body
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Change Stock : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, instock } = req.body;
    const product = await Product.findByIdAndUpdate(id, { instock }, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product, message: "Stock Updated Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
