import express from "express";
import projectCtrl from "../controllers/project.controller.js";
import { requireSignin, hasAuthorization } from "../controllers/auth.controller.js";

const router = express.Router();

// List all projects (public)
router.get("/api/projects", projectCtrl.list);

// Create a new project (protected)
router.post("/api/projects", requireSignin, hasAuthorization, projectCtrl.create);

// Read one project (public)
router.get("/api/projects/:projectId", projectCtrl.read);

// Update a project (protected)
router.put("/api/projects/:projectId", requireSignin, hasAuthorization, projectCtrl.update);

// Delete a project (protected)
router.delete("/api/projects/:projectId", requireSignin, hasAuthorization, projectCtrl.remove);

// Remove all projects (protected)
router.delete("/api/projects", requireSignin, hasAuthorization, projectCtrl.removeAll);

// Middleware for projectId
router.param("projectId", projectCtrl.projectByID);

export default router;
