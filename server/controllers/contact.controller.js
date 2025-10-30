import Contact from "../models/contact.model.js";
import errorHandler from "./error.controller.js";

// Create contact
const create = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    await contact.save();
    res.status(201).json({ message: "Contact created successfully", contact });
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Get all contacts
const list = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Get contact by ID
const contactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    req.contact = contact;
    next();
  } catch (err) {
    res.status(400).json({ error: "Could not retrieve contact" });
  }
};

// Read one contact
const read = (req, res) => res.json(req.contact);

// Update contact
const update = async (req, res) => {
  try {
    Object.assign(req.contact, req.body);
    await req.contact.save();
    res.json(req.contact);
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Delete one contact
const remove = async (req, res) => {
  try {
    await req.contact.deleteOne();
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Delete all contacts
const removeAll = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: "All contacts deleted" });
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, list, contactByID, read, update, remove, removeAll };
