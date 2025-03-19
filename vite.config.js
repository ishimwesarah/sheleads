import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH|| "/sheleads", // Ensure correct routing
  server: {
    historyApiFallback: true, // Redirects all unknown routes to index.html
  },
});
