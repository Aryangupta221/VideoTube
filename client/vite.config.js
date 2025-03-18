import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

// Fix for __dirname in ESM
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
    proxy: mode === "development"
      ? {
          "/api": {
            target: "http://localhost:4000",
            changeOrigin: true,
            secure: false,
          },
        }
      : {}, // ❌ No proxy in production
  },
  build: {
    outDir: "dist", // Ensures build output is correct
  },
}));
