import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// Fix for __dirname in ESM
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000", // Local dev only
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));

