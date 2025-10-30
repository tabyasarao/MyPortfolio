import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";

// ---------------------------
// Connect to MongoDB
// ---------------------------
mongoose.Promise = global.Promise;

mongoose
  .connect(config.mongoUri)
  .then(() => console.log("✅ Connected to the MongoDB database successfully!"))
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  });

mongoose.connection.on("error", () => {
  throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});

// ---------------------------
// Load Models
// ---------------------------
import "./server/models/user.model.js";
import "./server/models/contact.model.js";
import "./server/models/qualification.model.js";
import "./server/models/project.model.js";

console.log("📦 All models loaded successfully!");

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
app.use("/auth", authRoutes);
app.use("/assets", assetsRoutes);

// ---------------------------
// Default Route
// ---------------------------
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Portfolio User Application API 🚀" });
});

// ---------------------------
// Start Server
// ---------------------------
console.log("🛠️ Backend initialization complete — starting server...");

app.listen(config.port, (err) => {
  if (err) {
    console.error("❌ Server startup error:", err);
  } else {
    console.info(`✅ Server started successfully on port ${config.port}.`);
  }
});