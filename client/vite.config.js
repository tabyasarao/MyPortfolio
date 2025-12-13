import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const { PORT = 3000 } = process.env;

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
      "/auth": {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: "dist",       // ⭐ REQUIRED FIX
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
  },

  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    globals: true,
  },

  esbuild: {
    jsx: "automatic",
  },
});
