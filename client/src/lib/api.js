import axios from "axios";

const api = axios.create({
  baseURL: "/api", // This works with Vite proxy in dev
  withCredentials: true, // needed if your backend requires cookies
});

export default api;