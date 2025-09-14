import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/connectdb.js';
dotenv.config();
import userRouter from "./routes/user.routes.js";
import sellerRouter from "./routes/seller.routes.js";
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import orderRouter from './routes/order.routes.js';
import addressRouter from './routes/address.routes.js';
import { stripeWebhooks } from './controllers/order.controller.js';
import salesRouter from './routes/sales.routes.js';


const app = express();

connectDB()


app.get('/favicon.ico', (req, res) => res.status(204).end());
app.post('/stripe',express.raw({type:"application/json"}),stripeWebhooks)

//middleware
app.use(express.json());
app.use(cookieParser());

//multiple origins Dynamic middleware
const allowedOrigins = ["http://localhost:5173"];
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

app.use(express.static('public'));


app.get('/',(req,res)=>res.send("API IS WORKING"));

app.use('/images',express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/seller",sellerRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/api/address",addressRouter);
app.use("/api/sales",salesRouter );
const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});