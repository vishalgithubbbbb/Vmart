import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

// Routes & Controllers
import userRouter from './routes/user.routes.js';
import sellerRouter from './routes/seller.routes.js';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import orderRouter from './routes/order.routes.js';
import addressRouter from './routes/address.routes.js';
import salesRouter from './routes/sales.routes.js';
import { stripeWebhooks } from './controllers/order.controller.js';
import { connectDB } from './config/connectdb.js';
import newsletterRouter from "./routes/newsletter.routes.js";


const app = express();

// Connect to DB
connectDB().then(() => {
  console.log("✅ DB connected");
}).catch((err) => {
  console.error("❌ DB connection failed:", err);
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "https://food.vishdelivers.shop", credentials: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => res.send('✅ Backend is running successfully'));
app.post('/stripe', express.raw({ type: "application/json" }), stripeWebhooks);
app.use('/images', express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/address", addressRouter);
app.use("/api/sales", salesRouter);
app.use("/api/newsletter", newsletterRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Local dev server (only runs locally)
app.listen(5000, "0.0.0.0", () => {
  console.log("🚀 Backend running on port 5000");
});


// ✅ Vercel-compatible export
export default app;
