import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/travelar/", // Set the base path for GitHub Pages deployment
    server: {
      proxy: {
        "/admin/xml": "https://travel-tool.net", // Proxy API calls during local development
      },
    },
});
