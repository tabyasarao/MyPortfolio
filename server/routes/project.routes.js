import express from "express";
import projectCtrl from "../controllers/project.controller.js";
import { requireSignin, isAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/projects", projectCtrl.list);
router.get("/projects/:projectId", projectCtrl.read);

// ADMIN ONLY ROUTES
router.post("/projects", requireSignin, isAdmin, projectCtrl.create);
router.put("/projects/:projectId", requireSignin, isAdmin, projectCtrl.update);
router.delete("/projects/:projectId", requireSignin, isAdmin, projectCtrl.remove);

// auto-load
router.param("projectId", projectCtrl.projectByID);

export default router;
