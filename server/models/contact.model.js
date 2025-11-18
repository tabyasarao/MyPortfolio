import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    required: "Email is required",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  message: {
    type: String,
    required: "Message content is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Contact", ContactSchema);
