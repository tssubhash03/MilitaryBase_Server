// routes/purchase.routes.js
import express from "express";
import { purchaseAsset } from "../controllers/purchase.controller.js";

const router = express.Router();

router.post("/", purchaseAsset);

export default router;
