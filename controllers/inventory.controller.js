import Inventory from "../models/Inventory.js";
import Asset from "../models/Asset.js";

// View list of assets (with optional base filter)
export const getInventoryAssets = async (req, res) => {
  try {
    const filter = {};

    if (req.query.baseId) {
      filter.baseId = Number(req.query.baseId); // Example: ?baseId=1
    }

    const inventory = await Inventory.find(filter).populate("assetId"); 
    // populate → pulls details from Asset model

    const response = inventory.map(item => ({
      baseId: item.baseId,
      quantity: item.quantity,
      asset: {
        id: item.assetId._id,
        name: item.assetId.name,
        type: item.assetId.type,
        unit: item.assetId.unit,
        imageUrl: item.assetId.imageUrl
      }
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inventory", error: error.message });
  }
};
