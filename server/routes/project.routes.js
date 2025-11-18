import express from "express";
import projectCtrl from "../controllers/project.controller.js";
import { requireSignin, hasAuthorization } from "../controllers/auth.controller.js";

const router = express.Router();

// ------- PUBLIC ROUTES -------
router.get("/api/projects", projectCtrl.list);
router.get("/api/projects/:projectId", projectCtrl.read);

// ------- ADMIN-ONLY ROUTES -------
router.post("/api/projects", requireSignin, hasAuthorization, projectCtrl.create);
router.put("/api/projects/:projectId", requireSignin, hasAuthorization, projectCtrl.update);
router.delete("/api/projects/:projectId", requireSignin, hasAuthorization, projectCtrl.remove);

// Param middleware
router.param("projectId", projectCtrl.projectByID);

export default router;
