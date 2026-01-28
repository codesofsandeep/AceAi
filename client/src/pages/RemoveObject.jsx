// import React, { useState } from "react";
// import {
//   Sparkles,
//   Upload,
//   Eraser,
//   Download,
//   Check
// } from "lucide-react";
// import toast from "react-hot-toast";
// import { useAuth } from "@clerk/clerk-react"; // if using Clerk


// const { getToken } = useAuth();

// const RemoveObject = () => {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [object, setObject] = useState("");
//   const [processed, setProcessed] = useState(false);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//     setProcessed(false);
//   };

//   const handleRemove = () => {
//     if (!image || !object.trim()) {
//       toast.error("Upload an image and describe the object to remove");
//       return;
//     }

//     // Dummy processing
//     setProcessed(true);
//     toast.success("Object removed successfully!");
//   };

//   return (
//     <div className="max-w-6xl mx-auto space-y-8">

//       {/* ===== HEADER ===== */}
//       <div>
//         <h1 className="text-2xl font-semibold flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] 
//       via-[#FF00FF] to-[#FFD700]">
//           <Eraser size={22} color="yellow" />
//           AI Object Removal
//         </h1>
//         <p className="text-sm text-slate-400 mt-1">
//           Remove unwanted objects from images using AI
//         </p>
//       </div>

//       {/* ===== MAIN GRID ===== */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* ===== LEFT : INPUT ===== */}
//         <div className="bg-[#111418]/80 border border-white/10 rounded-2xl p-6 space-y-6">

//           {/* Upload */}
//           <div>
//             <label className="text-sm text-slate-400">Upload Image</label>
//             <label className="mt-2 flex flex-col items-center justify-center gap-2 h-40 rounded-xl border border-dashed border-white/20 cursor-pointer hover:border-purple-400 transition">
//               <Upload size={22} className="text-slate-400" />
//               <p className="text-sm text-slate-400">
//                 Click to upload or drag & drop
//               </p>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
//             </label>
//           </div>

//           {/* Object Description */}
//           <div>
//             <label className="text-sm text-slate-400">
//               Object to Remove
//             </label>
//             <input
//               value={object}
//               onChange={(e) => setObject(e.target.value)}
//               placeholder="e.g. person, logo, car, text"
//               className="w-full mt-2 bg-[#0b0e13] border border-white/10 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>

//           {/* Action */}
//           <button
//             onClick={handleRemove}
//             className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 font-medium hover:opacity-90 transition"
//           >
//             <Sparkles size={18} />
//             Remove Object
//           </button>
//         </div>

//         {/* ===== RIGHT : PREVIEW ===== */}
//         <div className="bg-[#111418]/80 border border-white/10 rounded-2xl p-6 space-y-4">

//           <p className="flex items-center gap-3 text-sm text-amber-400">Preview <Sparkles size={15} color="skyblue" /> </p>

//           <div className="h-[360px] rounded-xl bg-[#0b0e13] border border-white/10 flex items-center justify-center overflow-hidden">
//             {preview ? (
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="w-full h-full object-contain"
//               />
//             ) : (
//               <p className="text-sm text-slate-500">
//                 Uploaded image preview will appear here
//               </p>
//             )}
//           </div>

//           {/* Download */}
//           {processed && preview && (
//             <a
//               href={preview}
//               download
//               className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
//             >
//               <Download size={18} />
//               Download Result
//             </a>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default RemoveObject;

// import React, { useState } from "react";
// import { Sparkles, Upload, Eraser, Download, Check } from "lucide-react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { useAuth } from "@clerk/clerk-react";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL || "/api",
//   withCredentials: true,
// });

// const RemoveObject = () => {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [object, setObject] = useState("");
//   const [processed, setProcessed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [copied, setCopied] = useState(false);

//   const { getToken } = useAuth();

//   // Upload Image
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       toast.error("Please upload a valid image");
//       return;
//     }

//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//     setProcessed(false);
//     setCopied(false);
//   };

//   // Remove Object via AI
//   const handleRemove = async () => {
//     if (!image || !object.trim()) {
//       toast.error("Upload an image and describe the object to remove");
//       return;
//     }

//     try {
//       setLoading(true);
//       setProcessed(false);

//       const formData = new FormData();
//       formData.append("image", image);
//       formData.append("object", object);

//       const token = await getToken(); // Clerk auth token
//       const res = await api.post("/ai/image/remove-object", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.data?.success) throw new Error(res.data?.message);

//       setPreview(res.data.content); // processed image URL
//       setProcessed(true);
//       toast.success("Object removed successfully ✨");
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || error.message || "Failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Download processed image
//   const downloadImage = async () => {
//     if (!processed || !preview) return;

//     try {
//       const response = await axios.get(preview, { responseType: "blob" });
//       const blobUrl = window.URL.createObjectURL(response.data);
//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = "object-removed.png";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(blobUrl);
//       toast.success("Image downloaded 📥");
//     } catch {
//       toast.error("Download failed ❌");
//     }
//   };

//   // Reset form
//   const reset = () => {
//     setImage(null);
//     setPreview(null);
//     setObject("");
//     setProcessed(false);
//     setCopied(false);
//   };

//   // Copy image URL
//   const handleCopy = async () => {
//     if (!processed || !preview) {
//       toast.error("Nothing to copy");
//       return;
//     }

//     await navigator.clipboard.writeText(preview);
//     setCopied(true);
//     toast.success("Image URL copied!");

//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="max-w-6xl mx-auto space-y-8">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-2xl font-semibold flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#FFD700]">
//           <Eraser size={22} color="yellow" /> AI Object Removal
//         </h1>
//         <p className="text-sm text-slate-400 mt-1">
//           Remove unwanted objects from images using AI
//         </p>
//       </div>

//       {/* MAIN GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* INPUT CARD */}
//         <div className="bg-[#111418]/80 border border-white/10 rounded-2xl p-6 space-y-6">

//           {/* Upload */}
//           <div>
//             <label className="text-sm text-slate-400">Upload Image</label>
//             <label className="mt-2 flex flex-col items-center justify-center gap-2 h-40 rounded-xl border border-dashed border-white/20 cursor-pointer hover:border-purple-400 transition">
//               <Upload size={22} className="text-slate-400" />
//               <p className="text-sm text-slate-400">
//                 Click to upload or drag & drop
//               </p>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
//             </label>
//           </div>

//           {/* Object Input */}
//           <div>
//             <label className="text-sm text-slate-400">Object to Remove</label>
//             <input
//               value={object}
//               onChange={(e) => setObject(e.target.value)}
//               placeholder="e.g. person, logo, car, text"
//               className="w-full mt-2 bg-[#0b0e13] border border-white/10 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex flex-col gap-3">
//             <button
//               onClick={handleRemove}
//               disabled={loading}
//               className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 font-medium hover:opacity-90 transition disabled:opacity-50"
//             >
//               <Sparkles size={18} />
//               {loading ? "Processing..." : "Remove Object"}
//             </button>

//             <button
//               onClick={reset}
//               className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
//             >
//               Reset
//             </button>
//           </div>
//         </div>

//         {/* PREVIEW CARD */}
//         <div className="bg-[#111418]/80 border border-white/10 rounded-2xl p-6 space-y-4">

//           <p className="flex items-center gap-3 text-sm text-amber-400">
//             Preview <Sparkles size={15} color="skyblue" />
//           </p>

//           <div className="h-[360px] rounded-xl bg-[#0b0e13] border border-white/10 flex items-center justify-center overflow-hidden">
//             {preview ? (
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="w-full h-full object-contain"
//               />
//             ) : (
//               <p className="text-sm text-slate-500">
//                 Uploaded image preview will appear here
//               </p>
//             )}
//           </div>

//           {processed && preview && (
//             <div className="flex flex-col sm:flex-row gap-2">
//               <button
//                 onClick={downloadImage}
//                 className="flex items-center justify-center gap-2 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white transition"
//               >
//                 <Download size={18} /> Download
//               </button>

//               <button
//                 onClick={handleCopy}
//                 className="flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
//               >
//                 {copied ? <Check size={18} /> : <Sparkles size={18} />}
//                 Copy URL
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RemoveObject;



import React, { useState } from "react";
import { Upload, Eraser, Download, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../lib/api";
const RemoveObject = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [object, setObject] = useState("");
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setProcessedImage(null);
  };

  // const handleRemove = async () => {
  //   if (!image || !object.trim()) {
  //     toast.error("Upload an image and describe the object to remove");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const formData = new FormData();
  //     formData.append("image", image);
  //     formData.append("object", object);

  //     // Get token from wherever you store it (localStorage / context)
  //     const token = localStorage.getItem("token");

  //     const res = await axios.post(
  //       "/api/ai/image/remove-object",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (!res.data.success) throw new Error(res.data.message);

  //     setProcessedImage(res.data.content);
  //     toast.success("Object removed successfully!");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.response?.data?.message || error.message || "Failed ❌");
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  // inside your remove function
  const handleRemove = async () => {
    if (!image || !object.trim()) {
      toast.error("Upload an image and describe the object to remove");
      return;
    }


    try {
      setLoading(true);


      const formData = new FormData();
      formData.append("image", image);
      formData.append("object", object);


      const token = "your-auth-token-if-needed"; // optional


      const res = await api.post("/ai/image/remove-object", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // optional
        },
      });


      if (!res.data.success) throw new Error(res.data.message);


      setProcessedImage(res.data.content); // your processed image URL
      toast.success("Object removed successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || "Failed ❌");
    } finally {
      setLoading(false);
    }
  };
  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement("a");
    link.href = processedImage;
    link.download = "object-removed.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded 📥");
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setProcessedImage(null);
    setObject("");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Eraser size={22} />
          AI Object Removal
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Remove unwanted objects from images using AI
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload + Object Input */}
        <div className="bg-[#111418]/80 p-6 rounded-2xl space-y-6">
          <label className="flex flex-col items-center justify-center h-40 rounded-xl border border-dashed cursor-pointer">
            <Upload size={22} />
            <p className="text-sm text-slate-400">Click to upload or drag & drop</p>
            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
          </label>

          <input
            value={object}
            onChange={(e) => setObject(e.target.value)}
            placeholder="Object to remove e.g. person, logo"
            className="w-full mt-2 bg-[#0b0e13] border border-white/10 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            disabled={loading}
            onClick={handleRemove}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
          >
            {loading ? "Processing..." : "Remove Object"}
          </button>

          {processedImage && (
            <button
              onClick={downloadImage}
              className="mt-2 w-full py-2 rounded-xl bg-green-600 text-white flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download Result
            </button>
          )}

          <button
            onClick={reset}
            className="mt-2 w-full py-2 rounded-xl bg-red-600 text-white"
          >
            Reset
          </button>
        </div>

        {/* Preview */}
        <div className="bg-[#111418]/80 p-6 rounded-2xl flex items-center justify-center">
          {preview ? (
            <img src={processedImage || preview} alt="Preview" className="w-full h-full object-contain rounded-xl" />
          ) : (
            <p className="text-sm text-slate-500 text-center">Uploaded image preview will appear here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;