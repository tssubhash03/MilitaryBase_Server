import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import assetRoutes from "./routes/asset.routes.js";
import purchaseRoutes from "./routes/purchase.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import { getInventoryAssets } from "./controllers/inventory.controller.js";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use("/api/assets", assetRoutes);
app.use("/api/purchases", purchaseRoutes);
app.get("api/inventory",inventoryRoutes);
app.use("/api/inventory/getAssetInInventory",getInventoryAssets);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`\n\nServer running on port ${PORT}`));
