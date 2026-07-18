import express from "express";

import { 
  getAllOrders, 
  getUserOrders, 
  placeOrderCOD, 
  placeOrderStripe,
  updateOrderStatus,
  trackOrder,
  monthlySales
} from "../controllers/order.controller.js";

import { authUser } from "../middlewares/authUser.js";
import { authSeller } from "../middlewares/authSeller.js";


const router = express.Router();



/*
=====================
 CUSTOMER ROUTES
=====================
*/


// Place COD Order
router.post(
  '/cod',
  authUser,
  placeOrderCOD
);


// Get user orders
router.get(
  '/user',
  authUser,
  getUserOrders
);


// Track single order
router.get(
  '/track/:orderId',
  authUser,
  trackOrder
);



// Online payment
router.post(
  '/stripe',
  authUser,
  placeOrderStripe
);




//=====================
// SELLER ROUTES
//=====================
router.get(
  "/monthly-sales",
  authSeller,
  monthlySales
);



// Get all orders
router.get(
  '/seller',
  authSeller,
  getAllOrders
);


// Update order status
router.post(
  '/update-status',
  authSeller,
  updateOrderStatus
);





export default router;