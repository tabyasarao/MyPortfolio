import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // 🔑 Import bcryptjs for hashing

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  // The field name is simplified to 'password' for consistency
  password: { 
    type: String,
    required: "Password is required",
  },
  role: {
    type: String,
    default: 'user', // Default all new sign-ups to 'user'
    enum: ['user', 'admin'] // Ensures only valid roles are saved
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

// --- Mongoose Middleware (Pre-Save Hook) ---
// This runs BEFORE saving the user document to the database.
UserSchema.pre("save", async function (next) {
  // Only hash the password if it is new or has been modified
  if (!this.isModified("password")) {
    return next();
  }

  // Check password length validation
  if (this.password.length < 6) {
    // Manually invalidate the document and prevent save
    return next(new Error("Password must be at least 6 characters."));
  }

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // Store the hash
    next();
  } catch (error) {
    next(error); // Pass any hashing errors to Mongoose
  }
});

// --- Mongoose Instance Method (Comparison) ---
// This adds a method to the user object to check password validity
UserSchema.methods.comparePassword = async function (candidatePassword) {
  // Use bcrypt to compare the plain text with the stored hash
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema);