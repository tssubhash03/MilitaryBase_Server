import express from "express";
import Asset from "../models/Asset.js";
import { getAssets } from "../controllers/asset.controller.js";
const router = express.Router();

// ✅ Secret endpoint to create assets
router.post("/secret-create", async (req, res) => {
  try {
    const asset = new Asset(req.body);
    await asset.save();
    res.status(201).json({ message: "Asset created successfully", asset });
  } catch (error) {
    res.status(500).json({ message: "Failed to create asset", error: error.message });
  }
});

// ✅ Public endpoint to get all assets
router.get("/", async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assets", error: error.message });
  }
});

// ✅ Public endpoint to get assets with optional filtering by type
router.get("/filter", getAssets);
export default router;
