import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";

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
// Import Routes (NO DUPLICATES)
// ---------------------------
import contactRoutes from "./server/routes/contact.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/qualification.routes.js";
import userRoutes from "./server/routes/user.routes.js";
import authRoutes from "./server/routes/auth.routes.js";
import assetsRoutes from "./server/assets-router.js";

// ---------------------------
// Mount Routes (CLEAN + CORRECT)
// ---------------------------
app.use("/api", contactRoutes);
app.use("/api", projectRoutes);
app.use("/api", qualificationRoutes);
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/assets", assetsRoutes);

// ---------------------------
// Default Route
// ---------------------------
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Portfolio Application API 🚀" });
});

// ---------------------------
// Start Server
// ---------------------------
console.log("🛠️ Starting backend server...");

app.listen(config.port, (err) => {
  if (err) {
    console.error("❌ Server failed to start:", err);
  } else {
    console.info(`✅ Server running on port ${config.port}`);
  }
});
