import Qualification from "../models/qualification.model.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  const qualification = new Qualification(req.body);
  try {
    await qualification.save();
    res.status(201).json({ message: "Qualification added", qualification });
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const list = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const qualificationByID = async (req, res, next, id) => {
  try {
    const qualification = await Qualification.findById(id);
    if (!qualification)
      return res.status(404).json({ error: "Qualification not found" });
    req.qualification = qualification;
    next();
  } catch (err) {
    res.status(400).json({ error: "Could not retrieve qualification" });
  }
};

const read = (req, res) => res.json(req.qualification);

const update = async (req, res) => {
  try {
    Object.assign(req.qualification, req.body);
    await req.qualification.save();
    res.json(req.qualification);
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const remove = async (req, res) => {
  try {
    await req.qualification.deleteOne();
    res.json({ message: "Qualification deleted" });
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const removeAll = async (req, res) => {
  try {
    await Qualification.deleteMany({});
    res.json({ message: "All qualifications d ed" });
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default {
  create,
  list,
  qualificationByID,
  read,
  update,
  remove,
  removeAll,
};
