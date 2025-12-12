import express from "express";
import qualificationCtrl from "../controllers/qualification.controller.js";
import { requireSignin, isAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

// PUBLIC ROUTES (anyone can view)
router.get("/qualifications", qualificationCtrl.list);
router.get("/qualifications/:qualificationId", qualificationCtrl.read);

// ADMIN ONLY ROUTES (CRUD)
router.post("/qualifications", requireSignin, isAdmin, qualificationCtrl.create);
router.put("/qualifications/:qualificationId", requireSignin, isAdmin, qualificationCtrl.update);
router.delete("/qualifications/:qualificationId", requireSignin, isAdmin, qualificationCtrl.remove);

// Auto-load parameter
router.param("qualificationId", qualificationCtrl.qualificationByID);

export default router;
