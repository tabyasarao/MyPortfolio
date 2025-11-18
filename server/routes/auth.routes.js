import express from "express";
import { signin, signout } from "../controllers/auth.controller.js";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();

// Authentication routes
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/signup", userCtrl.create);

export default router;
