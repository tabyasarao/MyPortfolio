import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: "School name is required",
    trim: true,
  },
  degree: {
    type: String,
    required: "Degree is required",
    trim: true,
  },
  year: {
    type: String,
    required: "Year is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Qualification", qualificationSchema);
