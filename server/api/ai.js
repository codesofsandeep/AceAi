import { requireAuth } from "@clerk/vercel";
import dbConnect from "../configs/db.js"; // cached Mongo connection
import AiModel from "../models/Creation.js"; // your mongoose model
import "dotenv/config";
import OpenAI from "openai";

export default requireAuth(async function handler(req, res) {
  await dbConnect(); // connect MongoDB

  const API_KEY = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey: API_KEY });

  if (req.method === "GET") {
    try {
      const creations = await AiModel.find({ userId: req.auth.userId });
      return res.status(200).json({ success: true, creations });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { prompt } = req.body;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      });

      const result = response.choices[0].message.content;

      // Save creation in DB
      const creation = await AiModel.create({
        userId: req.auth.userId,
        prompt,
        result,
        type: "Text", // or dynamic
      });

      return res.status(200).json({ success: true, result, creation });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
});