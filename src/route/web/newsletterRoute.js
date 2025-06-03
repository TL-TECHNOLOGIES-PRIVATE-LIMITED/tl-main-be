import express from "express";
import { subscribeToNewsletter, unsubscribeFromNewsletter } from "../../controller/newsletterController.js";


const router = express.Router();


// Newsletter Routes
router.post("/subscribe", subscribeToNewsletter);
router.post("/unsubscribe", unsubscribeFromNewsletter);

export default router; 