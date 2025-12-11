import config from "./server/config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

// ---------------------------
// MongoDB connection
// ---------------------------

mongoose.Promise = global.Promise;

mongoose
  .connect(config.mongoUri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ Database error:", err);
    process.exit(1);
  });

// Load Models
import "./server/models/user.model.js";
import "./server/models/contact.model.js";
import "./server/models/qualification.model.js";
import "./server/models/project.model.js";

// Routes
import contactRoutes from "./server/routes/contact.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";
import userRoutes from "./server/routes/user.routes.js";
import authRoutes from "./server/routes/auth.routes.js";
import assetsRoutes from "./server/assets-router.js";

app.use("/api", contactRoutes);
app.use("/api", projectRoutes);
app.use("/api", qualificationRoutes);
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/assets", assetsRoutes);

// ---------------------------
// Serve Frontend (React)
// ---------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

// ---------------------------
// Start Server
// ---------------------------
app.listen(config.port, () =>
  console.log(`🚀 Full-stack app running on port ${config.port}`)
);
