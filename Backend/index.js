import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/connectdb.js';
dotenv.config();
import { connectCLoudinary } from './config/cloudinary.js';
import userRouter from "./routes/user.routes.js";
import sellerRouter from "./routes/seller.routes.js";
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import orderRouter from './routes/order.routes.js';
import addressRouter from './routes/address.routes.js';
import { stripeWebhooks } from './controllers/order.controller.js';

const app = express();

connectDB()
connectCLoudinary()


app.post('/stripe',express.raw({type:"application/json"}),stripeWebhooks)

//middleware
app.use(express.json());
app.use(cookieParser());

//multiple origins Dynamic middleware
const allowedOrigins = ["http://localhost:5173","https://your-vercel-app.vercel.app"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

//api EndPoint
app.use('/', (req, res) => {
  res.send('🚀 Server is running!');
});
app.use('/images',express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/seller",sellerRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/api/address",addressRouter);
const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});