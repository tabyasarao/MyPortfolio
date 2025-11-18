import Contact from '../models/contact.model.js';
import errorHandler from './error.controller.js';

// Load contact by ID
const findContactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ error: "Message not found" });

    req.contact = contact;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid contact ID format" });
  }
};

// Create message (public)
const create = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    await contact.save();
    return res.status(200).json({ message: "Message successfully sent!" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err) || "Could not save message"
    });
  }
};

// List all messages (admin)
const list = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json(contacts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err) || "Failed to load messages"
    });
  }
};

// Delete message (admin)
const remove = async (req, res) => {
  try {
    await req.contact.deleteOne();
    return res.json({ message: "Message deleted" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err) || "Delete failed"
    });
  }
};

export default { create, findContactByID, list, remove };
