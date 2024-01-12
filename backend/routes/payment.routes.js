import express from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controllers.js";

const router = express.Router();

router.post("/orders", createOrder);
router.post("/verify", verifyPayment);

export default router;
