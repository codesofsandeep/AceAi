import mongoose from "mongoose";

const creationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    prompt: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, default: "Article" },
  },
  { timestamps: true }
);

export default mongoose.model("Creation", creationSchema);
