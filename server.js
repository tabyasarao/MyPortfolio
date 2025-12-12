import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// ---------------------------
// Connect to MongoDB
// ---------------------------
mongoose.Promise = global.Promise;

mongoose
  .connect(config.mongoUri)
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  });

mongoose.connection.on("error", () => {
  throw new Error(`Unable to connect to DB: ${config.mongoUri}`);
});

// ---------------------------
// Load Models
// ---------------------------
import "./server/models/user.model.js";
import "./server/models/contact.model.js";
import "./server/models/qualification.model.js";
import "./server/models/project.model.js";

console.log("📦 All models loaded");

// ---------------------------
// Import Routes
// ---------------------------
import contactRoutes from "./server/routes/contact.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";
import userRoutes from "./server/routes/user.routes.js";
import authRoutes from "./server/routes/auth.routes.js";
import assetsRoutes from "./server/assets-router.js";

// ---------------------------
// Mount Routes
// ---------------------------
app.use("/api", contactRoutes);
app.use("/api", projectRoutes);
app.use("/api", qualificationRoutes);
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/assets", assetsRoutes);

// ---------------------------
// Serve Frontend (React Build)
// ---------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, "client/dist")));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

// ---------------------------
// Start Server
// ---------------------------
console.log("🛠️ Starting backend server...");

app.listen(config.port, () => {
  console.info(`✅ Server running on port ${config.port}`);
});
