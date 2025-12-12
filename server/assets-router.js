import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve images and videos from /public/assets folder
const assetsPath = path.join(__dirname, "../../client/public");

// REMOVE the "/assets" prefix here! 
// The prefix will be applied in server.js.
router.use(express.static(assetsPath));

export default router;
