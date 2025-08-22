import Purchase from "../models/Purchase.js";
import Asset from "../models/Asset.js";

// Create purchase
export const createPurchase = async (req, res) => {
  try {
    const { assetId, quantity, base } = req.body;
    const user = req.user; // from authMiddleware

    // If admin -> must select base
    if (user.role === "admin" && !base) {
      return res.status(400).json({ message: "Admin must choose a base" });
    }

    // If logistics -> auto assign to their base
    const finalBase = user.role === "logistics" ? user.base : base;

    const purchase = new Purchase({
      asset: assetId,
      quantity,
      base: finalBase,
      purchasedBy: user._id,
    });

    await purchase.save();
    res.json({ message: "Purchase successful", purchase });
  } catch (error) {
    res.status(500).json({ message: "Purchase failed", error: error.message });
  }
};

// Get all purchases for a base
export const getBasePurchases = async (req, res) => {
  try {
    const baseId = req.params.baseId;
    const purchases = await Purchase.find({ base: baseId }).populate("asset");
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch purchases", error: error.message });
  }
};
