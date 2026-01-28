import express from "express";
import { requireAuth } from "@clerk/express";
import {
    getUserCreations,
    getPublishCreations
} from "../controllers/userController.js";

const router = express.Router();

/**
 * 🔐 Get logged-in user's creations (private dashboard)
 */
router.get(
    "/my-creations",
    requireAuth(),
    getUserCreations
);

/**
 * 🌍 Get all published creations (public feed / explore)
 */
router.get(
    "/published",
    getPublishCreations
);

export default router;
