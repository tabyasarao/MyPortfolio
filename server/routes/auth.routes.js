import express from "express";
import { signin, signout } from "../controllers/auth.controller.js";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();

// Authentication routes
router.post("/auth/signin", signin);
router.get("/auth/signout", signout);
router.post("/auth/signup", userCtrl.create);

export default router;
