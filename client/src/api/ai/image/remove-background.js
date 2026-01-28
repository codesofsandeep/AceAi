// api/ai/image/remove-background.js

import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import fs from "fs";
import { requireAuth } from "@clerk/clerk-sdk-node";
import Creation from "@/models/Creation";

export const config = {
    api: {
        bodyParser: false, // REQUIRED for file uploads
    },
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false });
    }

    try {
        const { userId } = requireAuth(req);

        const form = formidable();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ success: false });
            }

            const image = files.image;
            if (!image) {
                return res.status(400).json({ success: false, message: "Image required" });
            }

            const uploadResult = await cloudinary.uploader.upload(image.filepath, {
                folder: "aceai/background-removed",
                background_removal: "cloudinary_ai",
            });

            await Creation.create({
                userId,
                prompt: "Remove background from image",
                content: uploadResult.secure_url,
                type: "background-removal",
            });

            res.status(200).json({
                success: true,
                content: uploadResult.secure_url,
            });
        });
    } catch (error) {
        console.error("❌ Background Removal Error:", error);
        res.status(500).json({ success: false });
    }
}