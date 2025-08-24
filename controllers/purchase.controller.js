import Inventory from "../models/Inventory.js";
import Asset from "../models/Asset.js";
import Purchase from "../models/Purchase.js";

export const purchaseAsset = async (req, res) => {
  try {
    const { assetId, baseId, quantity, role} = req.body;

    if (role === "commander") {
      return res.status(403).json({ message: "Commander is not allowed to perform purchase" });
    }

    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    // check if inventory exists for this base & asset
    let inventory = await Inventory.findOne({ asset: assetId, base : baseId });

    if (inventory) {
      inventory.quantity += quantity;
      await inventory.save();
    } else {
      inventory = await Inventory.create({ asset: assetId, base : baseId, quantity });
    }

    // ✅ create purchase log
    const purchaseLog = await Purchase.create({
      asset: assetId,
      baseId,
      quantity,
      // purchasedBy: userId || null,
      role,
    });

    res.json({
      message: "Inventory updated successfully, purchase logged",
      inventory,
      purchaseLog,
    });
  } catch (error) {
    res.status(500).json({ message: "Purchase failed", error: error.message });
  }
};
