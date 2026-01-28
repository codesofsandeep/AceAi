// // // .. aiController.js

import OpenAI from "openai";
import Creation from "../models/Creation.js";
import axios from "axios";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
// import pdfParse from "pdf-parse";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

// const pdfData = await pdfParse(buffer);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// // Article Generation
// export const generateArticle = async (req, res) => {
//     try {
//         const { userId } = req.auth();
//         const { prompt, length = "short" } = req.body;
//         const plan = req.body;

//         if (plan !== "premium" && free_usage >= 10) {
//             return res.json({ success: false, message: "Limit Reached. Upgrade to continue" })
//         }

//         if (!prompt) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Prompt is required",
//             });
//         }

//         const lengthMap = {
//             short: 400,
//             medium: 800,
//             long: 1200,
//         };

//         const response = await openai.chat.completions.create({
//             model: "gpt-4o",
//             messages: [
//                 {
//                     role: "system",
//                     content:
//                         "You are AceAI, an advanced AI that writes high-quality, SEO-optimized, human-like articles.",
//                 },
//                 {
//                     role: "user",
//                     content: prompt,
//                 },
//             ],
//             temperature: 0.7,
//             max_tokens: lengthMap[length],
//         });

//         const article = response.choices?.[0]?.message?.content;

//         if (!article) {
//             return res.status(500).json({
//                 success: false,
//                 message: "AI failed to generate content",
//             });
//         }

//         // ✅ SAVE TO MONGODB
//         await Creation.create({
//             userId,
//             prompt,
//             content: article,
//             type: "article",
//         });

//         res.status(200).json({
//             success: true,
//             content: article,
//         });
//     } catch (error) {
//         console.error("❌ AI Error:", error);
//         res.status(500).json({
//             success: false,
//             message: "AI generation failed",
//         });
//     }
// };

// Article Generation
export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length = "short" } = req.body;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        const lengthMap = {
            short: 200,
            medium: 400,
            long: 600,
        };

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You are AceAI, an advanced AI that writes high-quality, SEO-optimized, human-like articles.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: lengthMap[length.toLowerCase()],
        });

        const article = response.choices?.[0]?.message?.content;

        if (!article) {
            return res.status(500).json({
                success: false,
                message: "AI failed to generate content",
            });
        }

        await Creation.create({
            userId,
            prompt,
            content: article,
            type: "article",
        });

        res.status(200).json({
            success: true,
            content: article,
        });

    } catch (error) {
        console.error("❌ AI Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "AI generation failed",
        });
    }
};



// Blog Title generation
export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an expert content strategist. Generate 5-10 catchy, SEO-friendly blog titles."
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.8,
            max_tokens: 150,
        });

        const title = response.choices?.[0]?.message?.content;

        if (!title) {
            return res.status(500).json({
                success: false,
                message: "AI failed to generate title",
            });
        }

        // ✅ SAVE TO MONGODB
        await Creation.create({
            userId,
            prompt,
            content: title,
            type: "blog-title",
        });

        res.status(200).json({
            success: true,
            content: title,
        });
    } catch (error) {
        console.error("❌ AI Error:", error);
        res.status(500).json({
            success: false,
            message: "AI generation failed",
        });
    }
};


// Generate Images
// export const generateImage = async (req, res) => {
//     try {
//         const { userId } = req.auth();
//         const { prompt, publish = false, plan } = req.body;

//         if (plan !== "premium") {
//             return res.status(403).json({
//                 success: false,
//                 message: "This feature is only available for premium subscriptions.",
//             });
//         }

//         if (!prompt) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Prompt is required",
//             });
//         }

//         const formData = new FormData();
//         formData.append("prompt", prompt);
//         // formData.append("n", 5 ,);

//         const { data } = await axios.post(
//             "https://clipdrop-api.co/text-to-image/v1",
//             formData,

//             {
//                 headers: {
//                     "x-api-key": process.env.CLIPDROP_API_KEY,
//                 },
//                 responseType: "arraybuffer",
//             }
//         );

//         const base64Image = `data:image/png;base64,${Buffer.from(
//             data
//         ).toString("base64")}`;

//         const uploadResult = await cloudinary.uploader.upload(base64Image, {
//             folder: "aceai/images",
//         });

//         await Creation.create({
//             userId,
//             prompt,
//             content: uploadResult.secure_url,
//             type: "image",
//             publish,
//         });

//         res.status(200).json({
//             success: true,
//             content: uploadResult.secure_url,
//         });
//     } catch (error) {
//         console.error("❌ Image AI Error:", error.response?.data || error);
//         res.status(500).json({
//             success: false,
//             message: "Image generation failed",
//         });
//     }
// };

export const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, publish = false, plan } = req.body;

        if (plan !== "premium") {
            return res.status(403).json({
                success: false,
                message: "This feature is only available for premium subscriptions.",
            });
        }

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        const images = [];

        // 🔁 Generate 5 images
        for (let i = 0; i < 5; i++) {
            const formData = new FormData();
            formData.append("prompt", prompt);

            const { data } = await axios.post(
                "https://clipdrop-api.co/text-to-image/v1",
                formData,
                {
                    headers: {
                        "x-api-key": process.env.CLIPDROP_API_KEY,
                    },
                    responseType: "arraybuffer",
                }
            );

            const base64Image = `data:image/png;base64,${Buffer.from(
                data
            ).toString("base64")}`;

            const uploadResult = await cloudinary.uploader.upload(base64Image, {
                folder: "aceai/images",
            });

            images.push(uploadResult.secure_url);

            await Creation.create({
                userId,
                prompt,
                content: uploadResult.secure_url,
                type: "image",
                publish,
            });
        }

        res.status(200).json({
            success: true,
            content: images, // ✅ ARRAY OF 5 IMAGES
        });
    } catch (error) {
        console.error("❌ Image AI Error:", error.response?.data || error);
        res.status(500).json({
            success: false,
            message: "Image generation failed",
        });
    }
};


// Background  Removal
// export const removeImageBackground = async (req, res) => {
//     try {
//         const { userId } = req.auth();
//         const plan = req.plan;
//         const image = req.file;

//         if (plan !== "premium") {
//             return res.status(403).json({
//                 success: false,
//                 message: "This feature is only available for premium subscriptions.",
//             });
//         }

//         if (!image) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Image file is required",
//             });
//         }

//         // ✅ Cloudinary AI Background Removal
//         const uploadResult = await cloudinary.uploader.upload(image.path, {
//             folder: "aceai/background-removed",
//             background_removal: "cloudinary_ai",
//         });

//         // ✅ Save to MongoDB
//         await Creation.create({
//             userId,
//             prompt: "Remove background from image",
//             content: uploadResult.secure_url,
//             type: "background-removal",
//         });

//         res.status(200).json({
//             success: true,
//             content: uploadResult.secure_url,
//         });
//     } catch (error) {
//         console.error("❌ Image AI Error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Image background removal failed",
//         });
//     }
// };

export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth();
        const image = req.file;


        if (!image) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }


        // Upload to Cloudinary with AI background removal
        const uploadResult = await cloudinary.uploader.upload(image.path, {
            folder: "aceai/background-removed",
            background_removal: "cloudinary_ai",
        });


        // Save record to DB
        await Creation.create({
            userId,
            prompt: "Remove background from image",
            content: uploadResult.secure_url,
            type: "background-removal",
        });


        res.status(200).json({ success: true, content: uploadResult.secure_url });
    } catch (error) {
        console.error("❌ Background Removal Error:", error);
        res.status(500).json({ success: false, message: "Image background removal failed" });
    }
};

// Remove Image Object
export const removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth();
        const plan = req.plan;
        const image = req.file;

        if (plan !== "premium") {
            return res.status(403).json({
                success: false,
                message: "This feature is only available for premium subscriptions.",
            });
        }

        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Image file is required",
            });
        }

        const uploadResult = await cloudinary.uploader.upload(image.path, {
            folder: "aceai/background-removed",
            background_removal: "cloudinary_ai",
        });

        await Creation.create({
            userId,
            prompt: "Background removed from image",
            content: uploadResult.secure_url,
            type: "background-removal",
        });

        res.status(200).json({
            success: true,
            content: uploadResult.secure_url,
        });
    } catch (error) {
        console.error("❌ Image AI Error:", error);
        res.status(500).json({
            success: false,
            message: "Image processing failed",
        });
    }
};

// Review Resume
// export const reviewResume = async (req, res) => {
//     try {
//         const { userId } = req.auth();
//         const plan = req.plan;
//         const resume = req.file;

//         // 🔐 Premium check
//         if (plan !== "premium") {
//             return res.status(403).json({
//                 success: false,
//                 message: "This feature is only available for premium users",
//             });
//         }

//         // 📄 File check
//         if (!resume) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Resume file is required",
//             });
//         }

//         // 📦 Size check (5MB)
//         if (resume.size > 5 * 1024 * 1024) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Resume file exceeds 5MB limit",
//             });
//         }

//         // 📖 Read & parse PDF
//         const dataBuffer = fs.readFileSync(resume.path);
//         const pdfData = await pdf(dataBuffer);

//         // 🧠 AI Prompt
//         const prompt = `
// Review the following resume and provide:
// 1. Strengths
// 2. Weaknesses
// 3. Areas of improvement
// 4. ATS optimization tips
// 5. Overall rating (out of 10)

// Resume Content:
// ${pdfData.text}
// `;

//         // 🤖 OpenAI call
//         const response = await openai.chat.completions.create({
//             model: "gpt-4o",
//             messages: [
//                 {
//                     role: "system",
//                     content: "You are an expert resume reviewer and ATS specialist.",
//                 },
//                 {
//                     role: "user",
//                     content: prompt,
//                 },
//             ],
//             temperature: 0.7,
//             max_tokens: 600,
//         });

//         const content = response.choices[0].message.content;

//         // 💾 Save to MongoDB
//         await Creation.create({
//             userId,
//             prompt: "Resume Review",
//             content,
//             type: "resume-review",
//         });

//         // ✅ Response
//         res.status(200).json({
//             success: true,
//             content,
//         });

//     } catch (error) {
//         console.error("❌ Resume Review Error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Resume review failed",
//         });
//     }
// };




// Review Resume


export const reviewResume = async (req, res) => {
  try {
    const auth = req.auth?.();
    const userId = auth?.userId || null;
    const resume = req.file;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Resume file exceeds 5MB limit",
      });
    }

    // ✅ PDF PARSE (FIXED)
    const buffer = fs.readFileSync(resume.path);
    const pdfData = await pdfParse(buffer);

    if (!pdfData.text || !pdfData.text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Unable to extract text from resume",
      });
    }

    const prompt = `
Review the following resume and provide:
1. Strengths
2. Weaknesses
3. Areas of improvement
4. ATS optimization tips
5. Overall rating (out of 10)

Resume Content:
${pdfData.text}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert resume reviewer and ATS specialist." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 600,
    });

    const content = response.choices[0].message.content;

    if (userId) {
      await Creation.create({
        userId,
        prompt: "Resume Review",
        content,
        type: "resume-review",
      });
    }

    res.status(200).json({ success: true, content });

  } catch (error) {
    console.error("❌ Resume Review Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Resume review failed",
    });
  }
};
