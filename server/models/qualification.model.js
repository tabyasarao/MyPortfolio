import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Qualification title is required",
    trim: true,
  },
  firstname: {
    type: String,
    required: "First name is required",
    trim: true,
  },
  lastname: {
    type: String,
    required: "Last name is required",
    trim: true,
  },
  email: {
    type: String,
    required: "Email is required",
    trim: true,
  },
  completion: {
    type: Date,
    required: "Completion date is required",
  },
  description: {
    type: String,
    required: "Description is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Qualification", qualificationSchema);
