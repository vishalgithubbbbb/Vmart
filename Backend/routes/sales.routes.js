// server/routes/admin.js
import express from "express";
import { authSeller } from "../middlewares/authSeller.js";
import { getSalesData } from "../controllers/sales.controllers.js";

const router = express.Router();
router.get('/seller',authSeller,getSalesData); // Matches /api/sales/seller


export default router;
        
