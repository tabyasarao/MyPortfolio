import Project from "../models/project.model.js";
import errorHandler from "./error.controller.js";

// ---------------- CREATE ----------------
const create = async (req, res) => {
  const project = new Project(req.body);

  try {
    await project.save();
    return res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// ---------------- LIST ALL ----------------
const list = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.json(projects);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// ---------------- FIND BY ID ----------------
const projectByID = async (req, res, next, id) => {
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    req.project = project;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Invalid Project ID format",
    });
  }
};

// ---------------- READ ONE ----------------
const read = (req, res) => {
  return res.json(req.project);
};

// ---------------- UPDATE ----------------
const update = async (req, res) => {
  try {
    Object.assign(req.project, req.body);
    await req.project.save();

    return res.json({
      message: "Project updated successfully",
      project: req.project,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// ---------------- DELETE ONE ----------------
const remove = async (req, res) => {
  try {
    await req.project.deleteOne();
    return res.json({ message: "Project deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// ---------------- DELETE ALL (Admin Utility) ----------------
const removeAll = async (req, res) => {
  try {
    await Project.deleteMany({});
    return res.json({ message: "All projects deleted" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  list,
  projectByID,
  read,
  update,
  remove,
  removeAll,
};
