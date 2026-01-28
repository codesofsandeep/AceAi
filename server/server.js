//server.js

import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js"; // Make sure this file exists
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/Cloudinary.js";

const app = express();

// Connect Cloudinary
connectCloudinary();

// Middleware
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cors({
  origin: ["https://ace-jhoxvm8lm-sandeeprajputs-projects.vercel.app"],
  credentials: true
}));


app.use(express.json());
app.use(clerkMiddleware());

// Connect DB
connectDB();

// Health check
app.get("/", (req, res) => {
    res.send("AceAI backend is live 🚀");
});

// Routes
app.use("/api/ai", requireAuth(), aiRouter); // matches frontend "/api/ai/..."

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));