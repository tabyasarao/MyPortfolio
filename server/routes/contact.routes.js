import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import { requireSignin, hasAuthorization } from "../controllers/auth.controller.js";

const router = express.Router();

// Public: create a contact message
router.post("/api/contact", contactCtrl.create);

// Admin only: list all messages
router.get("/api/contact", requireSignin, hasAuthorization, contactCtrl.list);

// Admin only: delete a message
router.delete("/api/contact/:contactId", requireSignin, hasAuthorization, contactCtrl.remove);

// Middleware to fetch a contact by ID
router.param("contactId", contactCtrl.findContactByID);

export default router;
