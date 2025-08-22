import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset", required: true },
  quantity: { type: Number, required: true },
  base: { type: Number, enum: [1, 2, 3, 4], required: true }, // Assigned base
  purchasedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Purchase", purchaseSchema);
