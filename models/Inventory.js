// models/Inventory.js
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  base: { type: Number, required: true }, // Base ID (1,2,3,4)
  asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset", required: true }, // Reference to Asset
  quantity: { type: Number, required: true, default: 0 }, // Current stock in base
}, { timestamps: true });

// Ensure one asset per base (no duplicate asset records in same base)
inventorySchema.index({ base: 1, asset: 1 }, { unique: true });

export default mongoose.model("Inventory", inventorySchema);
``