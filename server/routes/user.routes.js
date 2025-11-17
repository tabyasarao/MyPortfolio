import express from "express";
import userCtrl from "../controllers/user.controller.js";
import { requireSignin, hasAuthorization } from "../controllers/auth.controller.js";

const router = express.Router();

// List all users
router.get("/api/users", userCtrl.list);

// Create a new user
router.post("/api/users", userCtrl.create);

// Get, update, delete a user by ID (requires signin and authorization)
router.get("/api/users/:userId", requireSignin, hasAuthorization, userCtrl.read);
router.put("/api/users/:userId", requireSignin, hasAuthorization, userCtrl.update);
router.delete("/api/users/:userId", requireSignin, hasAuthorization, userCtrl.remove);

// Middleware to fetch user by ID
router.param("userId", userCtrl.userByID);

export default router;
