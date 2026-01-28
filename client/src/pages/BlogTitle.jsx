


import React, { useState } from "react";
import { Sparkles, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitle = () => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [titles, setTitles] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const generateTitles = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a blog topic");
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();
      // const { data } = await axios.post(
      //   "/api/ai/generate-blog-title",
      //   { prompt: topic, tone },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt, length: length.toLowerCase() },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        // The API can return multiple titles separated by newlines
        const generatedTitles = data.content.split("\n").filter(Boolean);
        setTitles(generatedTitles);
        toast.success("Blog titles generated ✨");
      } else {
        toast.error(data.message || "Failed to generate titles");
      }
    } catch (error) {
      console.error("❌ Blog Title Generation Error:", error);
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const copyTitle = async (text, index) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Title copied!");
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* ===== HEADER ===== */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#FFD700] flex items-center gap-2">
          <Sparkles size={22} color="yellow" /> Blog Title Generator
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Generate catchy, SEO-friendly blog titles instantly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ===== INPUT CARD ===== */}
        <div className="bg-[#111418]/80 border border-white/10 rounded-2xl p-6 space-y-5">
          {/* Topic */}
          <div>
            <label className="text-sm text-slate-300">Blog Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. AI in healthcare"
              className="mt-2 w-full px-4 py-3 rounded-xl bg-[#0b0e13] border border-white/10 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Tone */}
          <div>
            <label className="text-sm text-slate-300">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl bg-[#0b0e13] border border-white/10 text-sm text-white outline-none"
            >
              <option>Professional</option>
              <option>Casual</option>
              <option>Informative</option>
              <option>Clickbait</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateTitles}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            <Sparkles size={18} />
            {loading ? "Generating..." : "Generate Titles"}
          </button>
        </div>

        {/* ===== OUTPUT CARD ===== */}
        {/* <div className="bg-[#111418]/80 border border-white/10 rounded-2xl p-6">
          <p className="flex items-center text-sm text-amber-400 gap-2 mb-3">
            Generated Titles <Sparkles size={15} color="skyblue" />
          </p>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-4">
            {titles.length ? (
              titles.map((title, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#0b0e13] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 hover:bg-[#1b1f25] transition"
                >
                  <span className="pr-3">{title}</span>
                  <button
                    onClick={() => copyTitle(title, index)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                  >
                    {copiedIndex === index ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                Generated blog titles will appear here...
              </p>
            )}
          </div>
        </div> */}

        {/* ===== OUTPUT CARD ===== */}
        <div className="bg-[#111418] border border-white/10 rounded-2xl p-6 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <p className="flex items-center text-sm text-amber-400 font-semibold gap-2">
              Generated Titles <Sparkles size={16} color="skyblue" />
            </p>
            <span className="text-xs text-slate-400 italic">
              Click the copy icon to save a title
            </span>
          </div>

          {/* Titles list */}
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2">
            {titles.length ? (
              titles.map((title, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gradient-to-r from-[#0b0e13] via-[#14171c] to-[#0b0e13] 
                     border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 
                     hover:from-[#1a1d22] hover:via-[#23272d] hover:to-[#1a1d22] transition-all duration-200"
                >
                  <span className="pr-3 break-words">{title}</span>
                  <button
                    onClick={() => copyTitle(title, index)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    title="Copy title"
                  >
                    {copiedIndex === index ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 italic">
                Your generated blog titles will appear here...
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogTitle;

