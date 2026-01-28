import React, { useState } from "react";
import { Sparkles, Copy, Check, Bot } from "lucide-react";
import toast from "react-hot-toast";
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Article = () => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");


  const [article, setArticle] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth()

  //   const handleGenerate = () => {
  //     if (!topic) {
  //       toast.error("Please enter an article topic");
  //       return;
  //     }

  //     setLoading(true);

  //     // 🔹 MOCK AI RESPONSE (replace with API later)
  //     setTimeout(() => {
  //       const mockArticle = `Title: ${topic}

  // Tone: ${tone}
  // Length: ${length}

  // Artificial Intelligence is transforming industries at an unprecedented pace.
  // From automation to intelligent decision-making, AI is reshaping how we work,
  // communicate, and innovate.

  // This article explores the future impact of AI with real-world insights
  // and practical examples to help you stay ahead in the AI-driven er
  // This article explores the future impact of AI with real-world insights
  // and practical examples to help you stay ahead in the AI-driven er
  // This article explores the future impact of AI with real-world insights
  // and practical examples to help you stay ahead in the AI-driven er
  // This article explores the future impact of AI with real-world insights
  // and practical examples to help you stay ahead in the AI-driven er
  // This article explores the future impact of AI with real-world insights
  // and practical examples to help you stay ahead in the AI-driven era.`;

  //       setArticle(mockArticle);
  //       setLoading(false);
  //       toast.success("Article generated successfully!");
  //     }, 1200);
  //   };

  const handleGenerate = async () => {
    if (!topic) {
      toast.error("Please enter an article topic");
      return;
    }

    try {
      setLoading(true);

      const prompt = `Write a ${tone.toLowerCase()} article about "${topic}"`;

      // const { data } = await axios.post(
      //   "/api/ai/generate-article",
      //   {
      //     prompt,
      //     length: length.toLowerCase(),
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${await getToken()}`,
      //     },
      //   }
      // );

      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: length.toLowerCase() },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setArticle(data.content);
        toast.success("Article generated successfully!");
      } else {
        toast.error(data.message || "Failed to generate article");
      }

    } catch (error) {
      console.error(error);
      toast.error("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleCopy = async (e) => {
  //   e.preventDeafault();
  //   try{
  //     setLoading(true);
  //     const prompt = `Write an article about ${input} in ${length.text}`;

  //     const {data} = await axios.post('/api/ai/generate-article' , {prompt, length} , {
  //       headers: {Authorization: `Bearer ${await getToken()}`}
  //     })

  //     if (data.success){
  //       setCon
  //     }
  //   } catch(error){

  //   }
  //   // if (!article) {
  //   //   toast.error("Nothing to copy");
  //   //   return;
  //   // }

  //   await navigator.clipboard.writeText(article);
  //   setCopied(true);
  //   toast.success("Article copied to clipboard!");

  //   setTimeout(() => setCopied(false), 2000);
  // };

  const handleCopy = async () => {
    if (!article) {
      toast.error("Nothing to copy");
      return;
    }

    await navigator.clipboard.writeText(article);
    setCopied(true);
    toast.success("Article copied!");

    setTimeout(() => setCopied(false), 2000);
  };



  return (
    <div className="w-full max-w-5xl mx-auto">

      {/* ===== HEADER ===== */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] 
      via-[#FF00FF] to-[#FFD700]">
          <Bot size={24} color="yellow" /> AI Article Writer
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Generate high-quality articles in seconds using AI
        </p>
      </div>

      {/* ===== FORM + OUTPUT ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ===== INPUT CARD ===== */}
        <div className="bg-[#111418]/80 border border-white/10 rounded-2xl p-6 space-y-5">

          {/* Topic */}
          <div>
            <label className="text-sm text-slate-300">Article Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. The future of AI in healthcare"
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
              <option>Persuasive</option>
            </select>
          </div>

          {/* Length */}
          <div>
            <label className="text-sm text-slate-300">Article Length</label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl bg-[#0b0e13] border border-white/10 text-sm text-white outline-none"
            >
              <option>Short</option>
              <option>Medium</option>
              <option>Long</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            <Sparkles size={18} />
            {loading ? "Generating..." : "Generate Article"}
          </button>
        </div>

        {/* ===== OUTPUT CARD ===== */}
        {/* <div className="bg-[#111418]/80 border border-white/10 rounded-2xl p-4 relative">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-amber-400 flex items-center gap-3">Generated Article <Sparkles size={15} color="skyblue" /></p>

            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>

          <div className="h-[340px] overflow-y-auto rounded-xl bg-[#0b0e13] border border-white/10 p-4 text-sm text-slate-200 leading-relaxed">
            {article ? (
              // <p className="whitespace-pre-line">{article}</p>
              <div className="prose prose-invert max-w-none text-slate-200">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {article}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="opacity-60">
                Your AI-generated article will appear here...
              </p>
            )}
          </div>
        </div> */}

        {/* ===== OUTPUT CARD ===== */}
        <div className="bg-gradient-to-br from-[#0f1115] to-[#181c24] border border-white/10 rounded-2xl p-4 relative shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-amber-400 flex items-center gap-2 font-semibold">
              Generated Article <Sparkles size={15} color="skyblue" />
            </p>

            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-blue-400" />
              )}
            </button>
          </div>

          {/* Markdown output */}
          <div className="h-[340px] overflow-y-auto rounded-xl bg-[#13171f] border border-white/10 p-4 text-sm leading-relaxed shadow-inner">
            {article ? (
              <div className="prose prose-invert max-w-none text-slate-200 break-words">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-lg font-bold mt-4 mb-2 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-base font-semibold mt-3 mb-1 text-purple-300" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-2 text-slate-200" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="ml-5 list-disc mb-1 text-slate-300" {...props} />
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-[#1f1f2a] text-green-400 px-1 py-0.5 rounded font-mono" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a className="text-cyan-400 underline hover:text-cyan-300 transition" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-4 border-purple-500 pl-4 italic text-purple-200 mb-2" {...props} />
                    ),
                  }}
                >
                  {article}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="opacity-60">
                Your AI-generated article will appear here...
              </p>
            )}
          </div>
        </div>



      </div>
    </div>
  );
};

export default Article;
