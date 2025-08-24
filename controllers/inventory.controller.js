import Inventory from "../models/Inventory.js";
import Asset from "../models/Asset.js";

// Get all assets under a base (or all bases if no filter)
export const getInventoryAssets = async (req, res) => {
  try {
    const filter = {};

    if (req.query.baseId) {
      filter.base = Number(req.query.baseId); // Example: ?base=1
    }

    const inventory = await Inventory.find(filter).populate("asset");

    const response = inventory.map(item => ({
      base: item.base,
      quantity: item.quantity,
      asset: {
        id: item.asset._id,
        name: item.asset.name,
        type: item.asset.type,
        unit: item.asset.unit,
        imageUrl: item.asset.imageUrl
      }
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inventory", error: error.message });
  }
};