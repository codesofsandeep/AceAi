


// import React, { useState } from "react";
// import { ImageMinus, Upload, Download, Sparkles } from "lucide-react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { useAuth } from "@clerk/clerk-react";



// const api = axios.create({
//   baseURL: "/api", // Vite proxy handles http://localhost:3000
//   withCredentials: true, // required for Clerk auth
// });

// const RemoveBackground = () => {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [processedImage, setProcessedImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { getToken } = useAuth();

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       toast.error("Please upload a valid image");
//       return;
//     }

//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//     setProcessedImage(null);
//   };

//   const handleRemoveBackground = async () => {
//     if (!image) return toast.error("Upload an image first");

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("image", image);

//       // const res = await api.post("/ai/image/remove-background", formData, {
//       //   headers: { "Content-Type": "multipart/form-data" },
//       // });

//       const res = await api.post(
//         "/ai/image/remove-background",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${await getToken()}`,
//           },
//         }
//       );

//       if (!res.data?.success) throw new Error(res.data?.message);

//       setProcessedImage(res.data.content);
//       toast.success("Background removed successfully ✨");
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || error.message || "Failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadImage = async () => {
//     if (!processedImage) return;
//     try {
//       const response = await axios.get(processedImage, { responseType: "blob" });
//       const blobUrl = window.URL.createObjectURL(response.data);
//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = "bg-removed.png";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(blobUrl);
//       toast.success("Image downloaded 📥");
//     } catch {
//       toast.error("Download failed ❌");
//     }
//   };

//   const reset = () => {
//     setImage(null);
//     setPreview(null);
//     setProcessedImage(null);
//   };

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="mb-8">
//         <h1 className="text-2xl font-semibold flex items-center gap-2">
//           <ImageMinus size={24} /> Remove Background
//         </h1>
//         <p>Upload an image and remove its background instantly using AI</p>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-6">
//         <div className="bg-gray-900 p-6 rounded-xl">
//           <label className="flex flex-col items-center justify-center border-2 border-dashed p-8 cursor-pointer">
//             <Upload size={26} className="mb-2" />
//             <p>Click to upload or drag & drop</p>
//             <input type="file" hidden onChange={handleUpload} />
//           </label>

//           {preview && <img src={preview} alt="Original" className="rounded-xl mt-4" />}

//           <button
//             disabled={loading}
//             onClick={handleRemoveBackground}
//             className="mt-4 w-full py-3 bg-indigo-500 rounded-xl text-white"
//           >
//             {loading ? "Processing..." : "Remove Background"}
//           </button>
//         </div>

//         <div className="bg-gray-900 p-6 rounded-xl flex flex-col">
//           {processedImage ? (
//             <img src={processedImage} alt="Processed" className="rounded-xl" />
//           ) : (
//             <p className="text-gray-400">Processed image will appear here</p>
//           )}

//           {processedImage && (
//             <button onClick={downloadImage} className="mt-4 bg-green-600 py-2 rounded-xl text-white">
//               <Download size={18} /> Download Image
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RemoveBackground;


import React, { useState } from "react";
import { ImageMinus, Upload, Download } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

// ✅ Create a dynamic API instance
const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "/api" // Vite dev proxy
    : `${window.location.origin}/api`, // Production
  withCredentials: true,
});

const RemoveBackground = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setProcessedImage(null);
  };

  const handleRemoveBackground = async () => {
    if (!image) return toast.error("Upload an image first");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);

      // Get Clerk token if needed
      const token = await getToken();

      const res = await api.post("/ai/image/remove-background", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.data?.success) throw new Error(res.data?.message);

      setProcessedImage(res.data.content);
      toast.success("Background removed successfully ✨");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || "Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!processedImage) return;
    try {
      const response = await axios.get(processedImage, { responseType: "blob" });
      const blobUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "bg-removed.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      toast.success("Image downloaded 📥");
    } catch {
      toast.error("Download failed ❌");
    }
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setProcessedImage(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* ===== HEADER ===== */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <ImageMinus size={24} /> Remove Background
        </h1>
        <p>Upload an image and remove its background instantly using AI</p>
      </div>

      {/* ===== GRID ===== */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* ===== UPLOAD ===== */}
        <div className="bg-gray-900 p-6 rounded-xl">
          <label className="flex flex-col items-center justify-center border-2 border-dashed p-8 cursor-pointer">
            <Upload size={26} className="mb-2" />
            <p>Click to upload or drag & drop</p>
            <input type="file" hidden onChange={handleUpload} />
          </label>

          {preview && <img src={preview} alt="Original" className="rounded-xl mt-4" />}

          <button
            disabled={loading}
            onClick={handleRemoveBackground}
            className="mt-4 w-full py-3 bg-indigo-500 rounded-xl text-white"
          >
            {loading ? "Processing..." : "Remove Background"}
          </button>
        </div>

        {/* ===== PREVIEW & DOWNLOAD ===== */}
        <div className="bg-gray-900 p-6 rounded-xl flex flex-col">
          {processedImage ? (
            <img src={processedImage} alt="Processed" className="rounded-xl" />
          ) : (
            <p className="text-gray-400">Processed image will appear here</p>
          )}

          {processedImage && (
            <button
              onClick={downloadImage}
              className="mt-4 bg-green-600 py-2 rounded-xl text-white flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download Image
            </button>
          )}

          {preview && (
            <button
              onClick={reset}
              className="mt-2 bg-red-600 py-2 rounded-xl text-white w-full"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;