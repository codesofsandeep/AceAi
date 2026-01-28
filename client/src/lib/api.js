// src/lib/api.js
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.DEV
        ? "/api" // Dev proxy (Vite)
        : `${window.location.origin}/api`, // Production on Vercel
    withCredentials: true,
});

export default api;