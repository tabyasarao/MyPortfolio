import express from "express"; // GOOD
import config from "./config/config.js";
import app from "./server/express.js"; // GOOD
import mongoose from "mongoose";
import path from "path";

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

// Mount routes
app.use("/api", contactRoutes);
app.use("/api", projectRoutes);
app.use("/api", qualificationRoutes);
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);

// Important: ONLY prefix here
app.use("/assets", assetsRoutes);

// Serve frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});
