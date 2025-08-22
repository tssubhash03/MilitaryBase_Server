import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["weapon", "vehicle", "medicine", "ammunition"], required: true },
  imageUrl: { type: String, required: true }, // Google image or static image
  unit: { type: String, required: true }, // e.g., bullets, liters, quantity
});

export default mongoose.model("Asset", assetSchema);
