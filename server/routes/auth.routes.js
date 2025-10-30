import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();

router.post("/auth/signin", authCtrl.signin);
router.get("/auth/signout", authCtrl.signout);
router.post("/auth/signup", userCtrl.create); // optional signup route

export default router;
