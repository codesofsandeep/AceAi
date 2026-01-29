import api from "../lib/api";

/* ========== ARTICLE ========== */
export const generateArticle = (data, token) =>
    api.post("/api/ai/generate-article", data, {
        headers: { Authorization: `Bearer ${token}` },
    });

/* ========== BLOG TITLE ========== */
export const generateBlogTitle = (data, token) =>
    api.post("/api/ai/generate-blog-title", data, {
        headers: { Authorization: `Bearer ${token}` },
    });

/* ========== IMAGE ========== */
// export const generateImage = (data, token) =>
//   api.post("/api/ai/generate-image", data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

export const generateImage = (data, token) =>
    api.post("/api/ai/generate-image", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

/* ========== REMOVE BACKGROUND ========== */
export const removeBackground = (formData, token) =>
    api.post("/api/ai/image/remove-background", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });