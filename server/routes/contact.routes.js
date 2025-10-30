import express from "express";
import contactCtrl from "../controllers/contact.controller.js";

const router = express.Router();

router.route("/api/contacts")
  .get(contactCtrl.list)         // Get all contacts
  .post(contactCtrl.create)      // Add new contact
  .delete(contactCtrl.removeAll) // Delete all contacts

router.route("/api/contacts/:contactId")
  .get(contactCtrl.read)         // Get contact by id
  .put(contactCtrl.update)       // Update contact by id
  .delete(contactCtrl.remove)    // Delete contact by id

router.param("contactId", contactCtrl.contactByID);

export default router;
