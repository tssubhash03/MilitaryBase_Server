// controllers/asset.controller.js
import Asset from "../models/Asset.js";

// Get all assets (with optional filtering by type)
export const getAssets = async (req, res) => {
  try {
    const filter = {};

    if (req.query.type) {
      filter.type = req.query.type; // e.g., ?type=weapon
    }
    console.log("\nType" +filter.type);
    const assets = await Asset.find(filter);
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assets", error: error.message });
  }
};
