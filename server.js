import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONNECT DB
mongoose.set("strictQuery", false);
mongoose
  .connect(config.mongoUri)
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

// LOAD MODELS
import "./server/models/user.model.js";
import "./server/models/contact.model.js";
import "./server/models/qualification.model.js";
import "./server/models/project.model.js";

// IMPORT ROUTES
import contactRoutes from "./server/routes/contact.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";
import userRoutes from "./server/routes/user.routes.js";
import authRoutes from "./server/routes/auth.routes.js";

// MOUNT API ROUTES
app.use("/api", contactRoutes);
app.use("/api", projectRoutes);
app.use("/api", qualificationRoutes);
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);

// SERVE FRONTEND (AFTER API ROUTES)
const frontendPath = path.join(__dirname, "client", "dist");
app.use(express.static(frontendPath));

// CATCH ALL FRONTEND ROUTES
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// START SERVER
app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});
