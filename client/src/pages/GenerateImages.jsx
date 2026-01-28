


import React, { useState } from "react";
import { Sparkles, Wand2, Download, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Realistic");
  const [ratio, setRatio] = useState("1:1");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { getToken } = useAuth();

  // ===== Generate Images =====
  const generateImages = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter an image prompt");
      return;
    }

    setLoading(true);

    try {
      // const token = await getToken();
      // const { data } = await axios.post(
      //   "/api/ai/generate-image",
      //   { prompt, style, ratio, plan: "premium" }, // send user's plan
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      // const { data } = await axios.post(
      //   "/api/ai/generate-image",
      //   { prompt, length: length.toLowerCase() },
      //   { headers: { Authorization: `Bearer ${await getToken()}` } }
      // );

      const token = await getToken();


      const { data } = await axios.post(
        "/api/ai/generate-image",
        {
          prompt,
          style,
          ratio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setImages(data.content);
        // Clipdrop returns 1 image at a time
        toast.success("Image generated ✨");
      } else {
        toast.error(data.message || "Image generation failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Image generation failed, try again!");
    }

    setLoading(false);
  };

  // ===== Copy Prompt =====
  const copyPrompt = async () => {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    toast.success("Prompt copied!");
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadImage = async (imageSrc, index) => {
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `ai-image-${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Image downloaded 📥");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download image ❌");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">

      {/* ===== HEADER ===== */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#FFD700]">
          <Wand2 size={24} color="yellow" /> AI Image Generator
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Create stunning AI-generated images from text prompts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ===== INPUT PANEL ===== */}
        <div className="bg-[#111418]/80 border border-white/10 rounded-2xl p-6 space-y-5">

          {/* Prompt */}
          <div>
            <label className="text-sm text-slate-300">Image Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A futuristic city with neon lights, cyberpunk style"
              rows={4}
              className="mt-2 w-full px-4 py-3 rounded-xl bg-[#0b0e13] border border-white/10 text-sm text-white outline-none resize-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Style */}
          <div>
            <label className="text-sm text-slate-300">Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl bg-[#0b0e13] border border-white/10 text-sm text-white outline-none"
            >
              <option>Realistic</option>
              <option>Anime</option>
              <option>Digital Art</option>
              <option>Cyberpunk</option>
              <option>3D Render</option>
            </select>
          </div>

          {/* Ratio */}
          <div>
            <label className="text-sm text-slate-300">Aspect Ratio</label>
            <select
              value={ratio}
              onChange={(e) => setRatio(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl bg-[#0b0e13] border border-white/10 text-sm text-white outline-none"
            >
              <option>1:1</option>
              <option>16:9</option>
              <option>9:16</option>
              <option>4:5</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={generateImages}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              <Sparkles size={18} />
              {loading ? "Generating..." : "Generate Images"}
            </button>

            <button
              onClick={copyPrompt}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              title="Copy prompt"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        {/* ===== OUTPUT PANEL ===== */}
        <div className="bg-[#111418]/80 border border-white/10 rounded-2xl p-6">
          <p className="flex items-center gap-3 text-sm text-amber-400 mb-4">
            Generated Images <Sparkles size={15} color="skyblue" />
          </p>

          {images.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[360px] overflow-y-auto pr-2">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="group relative rounded-xl overflow-hidden border border-white/10"
                >
                  <img
                    src={img}
                    alt={`Generated ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => downloadImage(img, i)}
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition bg-black/60 p-2 rounded-lg"
                  >
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[320px] flex items-center justify-center text-sm text-slate-500">
              Your generated images will appear here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
