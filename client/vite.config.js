import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:3000",
        target: "https://aceai-jnm9.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});