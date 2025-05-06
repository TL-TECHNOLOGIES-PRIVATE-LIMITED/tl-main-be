import express from "express";
import newsletterRoutes from "./newsletterRoute.js";

const router = express.Router();
router.use("/newsletter", newsletterRoutes);
export default router; 