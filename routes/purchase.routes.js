import express from "express";
import { createPurchase, getBasePurchases } from "../controllers/purchase.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPurchase);
router.get("/:baseId", protect, getBasePurchases);

export default router;
