import express from "express";
import { requireAuth } from "@clerk/express";
import {
    generateArticle,
    generateBlogTitle,
    generateImage,
    removeImageBackground,
    removeImageObject,
    reviewResume,
} from "../controllers/aiController.js";

import Creation from "../models/Creation.js";

import { upload } from "../middlewares/multer.js";

const router = express.Router();

/* ================= TEXT ================= */
router.post("/generate-article", requireAuth(), generateArticle);
router.post("/generate-blog-title", requireAuth(), generateBlogTitle);

/* ================= IMAGE ================= */
router.post(
    "/generate-image",
    requireAuth(),
    generateImage
);


router.get("/user/get-user-creations", async (req, res) => {
    try {
        const auth = req.auth(); // ✅ get auth object
        const userId = auth.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const creations = await Creation.find({ userId }); // fixed

        return res.json({ success: true, creations });
    } catch (error) {
        console.error("Error in get-user-creations:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});




// REMOVE BACKGROUND
router.post(
    "/image/remove-background",
    requireAuth(),
    upload.single("image"),
    removeImageBackground
);


router.post(
    "/remove-object",
    requireAuth(),
    upload.single("image"),
    removeImageObject
);

/* ================= RESUME ================= */
router.post(
    "/review-resume",
    requireAuth(),
    upload.single("resume"),
    reviewResume
);

export default router;
