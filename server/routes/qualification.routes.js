import express from "express";
import qualificationCtrl from "../controllers/qualification.controller.js";
import { requireSignin, hasAuthorization } from "../controllers/auth.controller.js";

const router = express.Router();

// List all qualifications (public)
router.get("/api/qualifications", qualificationCtrl.list);

// Create a new qualification (admin only)
router.post("/api/qualifications", requireSignin, hasAuthorization, qualificationCtrl.create);

// Read a single qualification (public)
router.get("/api/qualifications/:qualificationId", qualificationCtrl.read);

// Update a qualification (admin only)
router.put("/api/qualifications/:qualificationId", requireSignin, hasAuthorization, qualificationCtrl.update);

// Delete a qualification (admin only)
router.delete("/api/qualifications/:qualificationId", requireSignin, hasAuthorization, qualificationCtrl.remove);

// Middleware to fetch qualification by ID
router.param("qualificationId", qualificationCtrl.qualificationByID);

export default router;
