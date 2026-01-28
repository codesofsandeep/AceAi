import { requireAuth } from "@clerk/clerk-sdk-node";
import axios from "axios";
import Creation from "@/models/Creation";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false });
    }

    try {
        const { userId } = requireAuth(req);

        const { prompt, style, ratio } = req.body;

        if (!prompt) {
            return res.status(400).json({ success: false, message: "Prompt required" });
        }

        // 🔥 Example: call your image provider here
        const imageResponse = await axios.post(
            "https://clipdrop-api.co/text-to-image/v1",
            {
                prompt: `${prompt}, ${style}, aspect ratio ${ratio}`,
            },
            {
                headers: {
                    "x-api-key": process.env.CLIPDROP_API_KEY,
                },
                responseType: "arraybuffer",
            }
        );

        const base64Image = `data:image/png;base64,${Buffer.from(
            imageResponse.data
        ).toString("base64")}`;

        await Creation.create({
            userId,
            prompt,
            content: base64Image,
            type: "image-generation",
        });

        res.status(200).json({
            success: true,
            content: [base64Image],
        });
    } catch (error) {
        console.error("❌ Image Generation Error:", error);
        res.status(403).json({
            success: false,
            message: "Unauthorized or failed",
        });
    }
}