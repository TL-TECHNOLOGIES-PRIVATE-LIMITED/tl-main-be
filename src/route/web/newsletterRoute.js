import express from "express";
import { subscribeToNewsletter } from "../../controller/newsletterController.js";


const router = express.Router();


// Newsletter Routes
router.post("/subscribe", subscribeToNewsletter);

export default router; 