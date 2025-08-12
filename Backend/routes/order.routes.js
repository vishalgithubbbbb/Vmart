import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from "../controllers/order.controller.js";

const router = express.Router();

router.post('/cod',authUser,placeOrderCOD);
router.get('/user',authUser,getUserOrders);
router.get('/seller',authUser,getAllOrders);
router.post('/stripe',authUser,placeOrderStripe);



export default router;
