import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Recuerda que esto lo debes sacar para vercel
  server: {
  proxy: {
   '/api': {
    target: 'https://travel-tool.net/admin/xml/allseasons.xml',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
   }
   }
  }   
});
