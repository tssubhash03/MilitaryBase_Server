import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },
    baseId: {
      type: Number,
      ref: "Base", // if you have a Base model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    // purchasedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // optional: track which user purchased
    // },
    
    role: {
      type: String,
      enum: ["admin", "logistics", "commander"],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Purchase", purchaseSchema);
