import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import transactionRoutes from "./routes/transactions.js";
import authRoutes from "./routes/auth.js";
import momoRoutes from "./routes/momo.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// Middleware
app.use(cors({ origin: "https://localhost:5173", credentials: true }));
app.use(express.json());

// Serve static files in production
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/momo", momoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
