import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// ---------------------------
// Public routes
// ---------------------------
router.post("/api/users", userCtrl.create); // Signup
router.get("/api/users", userCtrl.list);    // List all users

// ---------------------------
// Protected routes (require signin)
// ---------------------------
router
  .route("/api/users/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)                          // Read user
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update) // Update user
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove); // Delete user

// ---------------------------
// Delete all users (protected)
// ---------------------------
router.delete("/api/users", authCtrl.requireSignin, userCtrl.removeAll);

// ---------------------------
// Param middleware
// ---------------------------
router.param("userId", userCtrl.userByID);

export default router;
