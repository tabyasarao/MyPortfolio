import express from "express";
import contactCtrl from "../controllers/contact.controller.js";

const router = express.Router();

// PUBLIC - send message
router.post("/contacts", contactCtrl.create);

// ADMIN - list messages
router.get("/contacts", contactCtrl.list);

// ADMIN - delete message
router.delete("/contacts/:contactId", contactCtrl.remove);

router.param("contactId", contactCtrl.findContactByID);

export default router;
