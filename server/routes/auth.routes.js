import express from "express";
import { signin, signout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

// Authentication routes
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/signup", signup);   // FIXED → use auth.controller.js

export default router;
