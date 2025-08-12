import express from "express";
import { isAuthSeller, sellerlogin, sellerlogout } from "../controllers/seller.controller.js";
import { authSeller } from "../middlewares/authSeller.js";


const router = express.Router();

router.post('/login',sellerlogin);
router.get('/is-auth',authSeller,isAuthSeller);
router.get('/logout',authSeller,sellerlogout);


export default router;
