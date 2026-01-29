// // import axios from "axios";

// // const api = axios.create({
// //   baseURL: "/api", // This works with Vite proxy in dev
// //   withCredentials: true, // needed if your backend requires cookies
// // });

// // export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   withCredentials: true,
// });

// // Optional: request logger (debugging)
// api.interceptors.request.use((config) => {
//   console.log("➡️ API:", config.method?.toUpperCase(), config.url);
//   return config;
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/api",
  withCredentials: true, // IMPORTANT for Clerk
});

// Optional: global error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;