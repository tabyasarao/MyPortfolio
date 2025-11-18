import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Project title is required",
    trim: true,
  },
  role: {
    type: String,
    required: "Role is required",
    trim: true,
  },
  image: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    required: "Project description is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Project", projectSchema);
