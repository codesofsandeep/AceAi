    // //server.js

    // import express from "express";
    // import cors from "cors";
    // import "dotenv/config";
    // import { clerkMiddleware, requireAuth } from "@clerk/express";
    // import aiRouter from "./routes/aiRoutes.js"; // Make sure this file exists
    // import connectDB from "./configs/db.js";
    // import connectCloudinary from "./configs/Cloudinary.js";

    // const app = express();

    // // Connect Cloudinary
    // connectCloudinary();

    // // Middleware
    // // app.use(cors({ origin: "http://localhost:5173", credentials: true }));

    // app.use(cors({
    //   origin: ["https://ace-jhoxvm8lm-sandeeprajputs-projects.vercel.app"],
    //   credentials: true
    // }));


    // app.use(express.json());
    // app.use(clerkMiddleware());

    // // Connect DB
    // connectDB();

    // // Health check
    // app.get("/", (req, res) => {
    //     res.send("AceAI backend is live 🚀");
    // });

    // // Routes
    // app.use("/api/ai", requireAuth(), aiRouter); // matches frontend "/api/ai/..."

    // const PORT = process.env.PORT || 3000;
    // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/Cloudinary.js";

const app = express();

// Connect to Cloudinary
connectCloudinary();

// Connect to Database
connectDB();

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173", // Vite dev
  "https://ace-ai-five.vercel.app" // Production frontend
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS not allowed for this origin"));
  },
  credentials: true, // Allow cookies and auth headers
}));

// Handle preflight requests for /api/ai
app.options("/api/ai/*", cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS not allowed for this origin"));
  },
  credentials: true,
}));

// Parse JSON
app.use(express.json());

// Clerk middleware
app.use(clerkMiddleware());

// Health check
app.get("/", (req, res) => {
  res.send("AceAI backend is live 🚀");
});

// Protected AI routes
app.use("/api/ai", requireAuth(), aiRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));