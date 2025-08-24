import express from "express";
import { getInventoryAssets } from "../controllers/inventory.controller.js";

const router = express.Router();

router.get("/", getInventoryAssets);

export default router;
