// controllers/asset.controller.js
import Asset from "../models/Asset.js";

// Get all assets (with optional filtering by type)
export const getAssets = async (req, res) => {
  try {
    const filter = {};

    if (req.query.type) {
      // Case-insensitive matching for type
      filter.type = { $regex: new RegExp(`^${req.query.type}$`, "i") };
    }

    if (req.query.name) {
      // Optional name-based search
      filter.name = { $regex: req.query.name, $options: "i" };
    }

    const assets = await Asset.find(filter);
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assets", error: error.message });
  }
};
