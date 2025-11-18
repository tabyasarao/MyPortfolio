// server/routes/qualification.routes.js
import express from "express";
import qualificationCtrl from "../controllers/qualification.controller.js";
import { requireSignin, hasAuthorization } from "../controllers/auth.controller.js";

const router = express.Router();

// Primary route used previously: /api/qualifications
router.get("/api/qualifications", qualificationCtrl.list);
router.post("/api/qualifications", requireSignin, hasAuthorization, qualificationCtrl.create);
router.get("/api/qualifications/:qualificationId", qualificationCtrl.read);
router.put("/api/qualifications/:qualificationId", requireSignin, hasAuthorization, qualificationCtrl.update);
router.delete("/api/qualifications/:qualificationId", requireSignin, hasAuthorization, qualificationCtrl.remove);
router.param("qualificationId", qualificationCtrl.qualificationByID);

// ALSO provide /api/educations endpoints (frontend uses /api/educations)
router.get("/api/educations", qualificationCtrl.list);
router.post("/api/educations", requireSignin, hasAuthorization, qualificationCtrl.create);
router.get("/api/educations/:qualificationId", qualificationCtrl.read);
router.put("/api/educations/:qualificationId", requireSignin, hasAuthorization, qualificationCtrl.update);
router.delete("/api/educations/:qualificationId", requireSignin, hasAuthorization, qualificationCtrl.remove);
router.param("qualificationId", qualificationCtrl.qualificationByID);

export default router;
