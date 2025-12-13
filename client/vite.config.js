import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Get PORT variable
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
    outDir: "dist",       // ⭐ REQUIRED — build goes into /client/dist
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: "./src/index.jsx",
    },
  },

  // ⭐ Vitest configuration (fixes JSX parsing)
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    globals: true,
  },

  // ⭐ REQUIRED so JSX (<App />) works in Vitest
  esbuild: {
    jsx: "automatic",
  },
});
