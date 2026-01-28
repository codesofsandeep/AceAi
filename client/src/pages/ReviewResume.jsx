


// import React, { useState } from "react";
// import {
//   Upload,
//   FileText,
//   CheckCircle,
//   AlertTriangle,
//   FileSearch,
// } from "lucide-react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";



// const ReviewResume = () => {
//   const [file, setFile] = useState(null);
//   const [reviewed, setReviewed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState("");

//   const handleUpload = (e) => {
//     const uploaded = e.target.files[0];
//     if (!uploaded) return;

//     setFile(uploaded);
//     setReviewed(false);
//     setResult("");
//   };

//   const handleReview = async () => {
//     if (!file) {
//       toast.error("Please upload a resume to continue");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("resume", file);

//       const res = await axios.post(
//         "/api/ai/review-resume",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (!res.data.success) {
//         throw new Error(res.data.message);
//       }

//       setResult(res.data.content);
//       setReviewed(true);
//       toast.success("Resume analysis completed ✅");
//     } catch (error) {
//       console.error(error);
//       toast.error(
//         error.response?.data?.message || "Resume review failed ❌"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto space-y-10">

//       {/* ===== HEADER ===== */}
//       <header className="space-y-1">
//         <h1 className="flex gap-2 items-center text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#FFD700]">
//           <FileSearch color="yellow" />
//           Resume Review
//         </h1>
//         <p className="text-sm text-slate-400 max-w-2xl">
//           Upload your resume to receive an AI-based evaluation focused on
//           clarity, impact, and applicant tracking system (ATS) compatibility.
//         </p>
//       </header>

//       {/* ===== CONTENT ===== */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//         {/* ===== UPLOAD PANEL ===== */}
//         <section className="bg-[#111418]/80 border border-white/10 rounded-2xl p-6 space-y-6">

//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               Resume file
//             </label>

//             <label className="flex flex-col items-center justify-center h-40 rounded-xl border border-dashed border-white/15 bg-[#0b0e13] cursor-pointer hover:border-slate-400 transition">
//               <Upload className="text-slate-400 mb-2" size={22} />
//               <p className="text-sm text-slate-400">
//                 Upload PDF or DOCX (max 5MB)
//               </p>
//               <input
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleUpload}
//                 className="hidden"
//               />
//             </label>
//           </div>

//           {file && (
//             <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
//               <FileText size={18} />
//               <p className="text-sm text-slate-300 truncate">
//                 {file.name}
//               </p>
//             </div>
//           )}

//           <button
//             onClick={handleReview}
//             disabled={loading}
//             className="w-full py-3 rounded-xl bg-slate-100 text-slate-900 font-medium hover:bg-white transition disabled:opacity-60"
//           >
//             {loading ? "Analyzing..." : "Analyze Resume"}
//           </button>
//         </section>

//         {/* ===== RESULTS PANEL ===== */}

//         {/* ===== RESULTS PANEL ===== */}
//       {/* ===== RESULTS PANEL ===== */}
// <section className="bg-[#111418]/80 border border-white/10 rounded-2xl p-8 space-y-8">

//   {!reviewed ? (
//     <p className="text-sm text-slate-500 text-center py-24">
//       Analysis results will appear here after submission
//     </p>
//   ) : (
//     <>
//       {/* OVERALL SCORE */}
//       <div className="flex items-center justify-between border-b border-white/10 pb-6">
//         <div>
//           <p className="text-sm text-amber-200">Overall Score</p>
//           <p className="text-3xl font-semibold text-slate-100 mt-2">
//             82 / 100
//           </p>
//         </div>
//         <div className="flex items-center gap-2 text-green-400">
//           <CheckCircle size={20} />
//           <span className="text-sm font-medium">ATS Compatible</span>
//         </div>
//       </div>

//       {/* AI ANALYSIS CONTENT WITH MARKDOWN */}
//       <div className="prose prose-invert max-w-full text-sm text-slate-300 leading-relaxed break-words py-4">
//         <ReactMarkdown remarkPlugins={[remarkGfm]}>
//           {result}
//         </ReactMarkdown>
//       </div>

//       {/* STRENGTHS */}
//       <div className="space-y-2">
//         <h3 className="text-sm font-medium text-slate-300 mb-2">
//           Key Strengths
//         </h3>
//         <div className="max-h-56 overflow-y-auto pr-4 bg-[#0b0e13] border border-white/10 rounded-lg p-3">
//           <ul className="space-y-2 text-sm text-slate-400 list-disc list-inside">
//             <li>Relevant technical and role-specific keywords</li>
//             <li>Clear role descriptions and project summaries</li>
//             <li>Consistent formatting and section hierarchy</li>
//           </ul>
//         </div>
//       </div>

//       {/* AREAS FOR IMPROVEMENT */}
//       <div className="space-y-2">
//         <h3 className="text-sm font-medium text-slate-300 mb-2">
//           Areas for Improvement
//         </h3>
//         <div className="max-h-56 overflow-y-auto pr-4 bg-[#0b0e13] border border-white/10 rounded-lg p-3">
//           <ul className="space-y-2 text-sm text-slate-400 list-disc list-inside">
//             <li>Quantify achievements using metrics where possible</li>
//             <li>Strengthen the professional summary section</li>
//             <li>Reduce repetition in older experience entries</li>
//           </ul>
//         </div>
//       </div>

//       {/* INFO / WARNING BOX */}
//       <div className="flex items-start gap-3 bg-[#0b0e13] border border-white/10 rounded-xl p-4 mt-4">
//         <AlertTriangle size={18} className="text-yellow-400 mt-0.5" />
//         <p className="text-sm text-slate-400">
//           This analysis is AI-generated. Review suggestions carefully before applying them.
//         </p>
//       </div>
//     </>
//   )}
// </section>
//       </div>
//     </div>
//   );
// };

// export default ReviewResume;

import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  FileSearch,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "@clerk/clerk-react";

const ReviewResume = () => {
  const [file, setFile] = useState(null);
  const [reviewed, setReviewed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const { getToken } = useAuth();

  // Upload Resume
  const handleUpload = (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;

    setFile(uploaded);
    setReviewed(false);
    setResult("");
  };

  // Analyze Resume
  const handleReview = async () => {
    if (!file) {
      toast.error("Please upload a resume to continue");
      return;
    }

    try {
      setLoading(true);
      setReviewed(false);
      setResult("");

      const formData = new FormData();
      formData.append("resume", file);

      const token = await getToken(); // Clerk auth token

      // const res = await axios.post("/api/ai/review-resume", formData, {
      //   withCredentials: true,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      const res = await axios.post(
        "/api/ai/image/review-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.message || "Analysis failed");
      }

      setResult(res.data.content);
      setReviewed(true);
      toast.success("Resume analysis completed ✅");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || error.message || "Resume review failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const reset = () => {
    setFile(null);
    setReviewed(false);
    setResult("");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">

      {/* HEADER */}
      <header className="space-y-1">
        <h1 className="flex gap-2 items-center text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#FFD700]">
          <FileSearch color="yellow" />
          Resume Review
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Upload your resume to receive an AI-based evaluation focused on
          clarity, impact, and ATS compatibility.
        </p>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* UPLOAD PANEL */}
        <section className="bg-[#111418]/80 border border-white/10 rounded-2xl p-6 space-y-6">

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Resume file
            </label>

            <label className="flex flex-col items-center justify-center h-40 rounded-xl border border-dashed border-white/15 bg-[#0b0e13] cursor-pointer hover:border-slate-400 transition">
              <Upload className="text-slate-400 mb-2" size={22} />
              <p className="text-sm text-slate-400">
                Upload PDF or DOCX (max 5MB)
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>

          {file && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <FileText size={18} />
              <p className="text-sm text-slate-300 truncate">{file.name}</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={handleReview}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-slate-100 text-slate-900 font-medium hover:bg-white transition disabled:opacity-60"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>

            <button
              onClick={reset}
              className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
            >
              Reset
            </button>
          </div>
        </section>

        {/* RESULTS PANEL */}
        <section className="bg-[#111418]/80 border border-white/10 rounded-2xl p-8 space-y-8">

          {!reviewed ? (
            <p className="text-sm text-slate-500 text-center py-24">
              Analysis results will appear here after submission
            </p>
          ) : (
            <>
              {/* OVERALL SCORE */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <p className="text-sm text-amber-200">Overall Score</p>
                  <p className="text-3xl font-semibold text-slate-100 mt-2">
                    82 / 100
                  </p>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle size={20} />
                  <span className="text-sm font-medium">ATS Compatible</span>
                </div>
              </div>

              {/* AI ANALYSIS CONTENT */}
              <div className="prose prose-invert max-w-full text-sm text-slate-300 leading-relaxed break-words py-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {result}
                </ReactMarkdown>
              </div>

              {/* STRENGTHS */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-300 mb-2">
                  Key Strengths
                </h3>
                <div className="max-h-56 overflow-y-auto pr-4 bg-[#0b0e13] border border-white/10 rounded-lg p-3">
                  <ul className="space-y-2 text-sm text-slate-400 list-disc list-inside">
                    <li>Relevant technical and role-specific keywords</li>
                    <li>Clear role descriptions and project summaries</li>
                    <li>Consistent formatting and section hierarchy</li>
                  </ul>
                </div>
              </div>

              {/* AREAS FOR IMPROVEMENT */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-300 mb-2">
                  Areas for Improvement
                </h3>
                <div className="max-h-56 overflow-y-auto pr-4 bg-[#0b0e13] border border-white/10 rounded-lg p-3">
                  <ul className="space-y-2 text-sm text-slate-400 list-disc list-inside">
                    <li>Quantify achievements using metrics where possible</li>
                    <li>Strengthen the professional summary section</li>
                    <li>Reduce repetition in older experience entries</li>
                  </ul>
                </div>
              </div>

              {/* INFO / WARNING */}
              <div className="flex items-start gap-3 bg-[#0b0e13] border border-white/10 rounded-xl p-4 mt-4">
                <AlertTriangle size={18} className="text-yellow-400 mt-0.5" />
                <p className="text-sm text-slate-400">
                  This analysis is AI-generated. Review suggestions carefully before applying them.
                </p>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default ReviewResume;