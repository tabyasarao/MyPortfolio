import express from "express";
import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
mongoose.Promise = global.Promise;

mongoose
  .connect(config.mongoUri)
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  });

// Load models
import "./server/models/user.model.js";
import "./server/models/contact.model.js";
import "./server/models/qualification.model.js";
import "./server/models/project.model.js";

// Import routes
import contactRoutes from "./server/routes/contact.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";
import userRoutes from "./server/routes/user.routes.js";
import authRoutes from "./server/routes/auth.routes.js";
import assetsRoutes from "./server/assets-router.js";

// Mount API routes
app.use("/api", contactRoutes);
app.use("/api", projectRoutes);
app.use("/api", qualificationRoutes);
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/assets", assetsRoutes);

// -------------------------------------------------------
// ⭐ SERVE FRONTEND BUILD (IMPORTANT FOR RENDER)
// -------------------------------------------------------
const frontendPath = path.join(__dirname, "../client/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});
