import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 1. Get the PORT environment variable, defaulting to 3000 if not set
const { PORT = 3000} = process.env; 

export default defineConfig({
  plugins: [react()],
  
  // 2. Add the server block for proxy configuration
  server:{
    proxy:{
        // Proxy /api requests (for CRUD operations)
        '/api':{
            target:`http://localhost:${PORT}`, // Forward to your backend server
            changeOrigin: true,
        },
        // Proxy /auth requests (for signin/signout)
        '/auth': {
            target:`http://localhost:${PORT}`, // Forward to your backend server
            changeOrigin: true,
        },
    },
  },
  
  // Existing build configurations
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
  },
});