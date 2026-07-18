import express from "express";
import { subscribeNewsletter,getSubscribers,sendNewsletter,sendOfferMail} from "../controllers/newsletter.controller.js";

const newsletterRouter = express.Router();

// Subscribe
newsletterRouter.post("/subscribe", subscribeNewsletter);
newsletterRouter.get("/all", getSubscribers);
newsletterRouter.post("/send", sendNewsletter);
newsletterRouter.post("/offer", sendOfferMail);

export default newsletterRouter;