import React, { useState } from "react";
import {
  Sparkles,
  Upload,
  Eraser,
  Download,
  Check
} from "lucide-react";
import toast from "react-hot-toast";

const RemoveObject = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [object, setObject] = useState("");
  const [processed, setProcessed] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setProcessed(false);
  };

  const handleRemove = () => {
    if (!image || !object.trim()) {
      toast.error("Upload an image and describe the object to remove");
      return;
    }

    // Dummy processing
    setProcessed(true);
    toast.success("Object removed successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] 
      via-[#FF00FF] to-[#FFD700]">
          <Eraser size={22} color="yellow" />
          AI Object Removal
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Remove unwanted objects from images using AI
        </p>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ===== LEFT : INPUT ===== */}
        <div className="bg-[#111418]/80 border border-white/10 rounded-2xl p-6 space-y-6">

          {/* Upload */}
          <div>
            <label className="text-sm text-slate-400">Upload Image</label>
            <label className="mt-2 flex flex-col items-center justify-center gap-2 h-40 rounded-xl border border-dashed border-white/20 cursor-pointer hover:border-purple-400 transition">
              <Upload size={22} className="text-slate-400" />
              <p className="text-sm text-slate-400">
                Click to upload or drag & drop
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Object Description */}
          <div>
            <label className="text-sm text-slate-400">
              Object to Remove
            </label>
            <input
              value={object}
              onChange={(e) => setObject(e.target.value)}
              placeholder="e.g. person, logo, car, text"
              className="w-full mt-2 bg-[#0b0e13] border border-white/10 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Action */}
          <button
            onClick={handleRemove}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 font-medium hover:opacity-90 transition"
          >
            <Sparkles size={18} />
            Remove Object
          </button>
        </div>

        {/* ===== RIGHT : PREVIEW ===== */}
        <div className="bg-[#111418]/80 border border-white/10 rounded-2xl p-6 space-y-4">

          <p className="flex items-center gap-3 text-sm text-amber-400">Preview <Sparkles size={15} color="skyblue" /> </p>

          <div className="h-[360px] rounded-xl bg-[#0b0e13] border border-white/10 flex items-center justify-center overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <p className="text-sm text-slate-500">
                Uploaded image preview will appear here
              </p>
            )}
          </div>

          {/* Download */}
          {processed && preview && (
            <a
              href={preview}
              download
              className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
            >
              <Download size={18} />
              Download Result
            </a>
          )}
        </div>

      </div>
    </div>
  );
};

export default RemoveObject;
