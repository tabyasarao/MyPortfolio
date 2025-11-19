import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import User from "../models/user.model.js";
import config from "../../config/config.js"; 
import errorController from "./error.controller.js";

const JWT_SECRET = config.jwtSecret || process.env.JWT_SECRET || "temporary_dev_secret";

// ------------------- SIGNIN -------------------
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });


    const token = jwt.sign(
      { _id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// ------------------- SIGNUP -------------------
export const signup = async (req, res) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();
    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(400).json({
      error:
        errorController.getErrorMessage(err) ||
        "Registration failed. Check if email is valid or unique.",
    });
  }
};

// ------------------- SIGNOUT -------------------
export const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "Signed out successfully" });
};

// ------------------- MIDDLEWARE -------------------
export const requireSignin = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth", // attaches decoded token to req.auth
});

// owner OR admin allowed
export const hasAuthorization = (req, res, next) => {
  const isAdmin = req.profile && req.profile.role === "admin";
  const isOwner =
    req.profile &&
    req.auth &&
    req.profile._id.toString() === req.auth._id;

  if (!isAdmin && !isOwner) {
    return res.status(403).json({
      error: "User is not authorized to perform this action.",
    });
  }
  next();
};

// admin-only routes
export const isAdmin = (req, res, next) => {
  if (!req.auth || req.auth.role !== "admin") {
    return res.status(403).json({ error: "Admin access only" });
  }
  next();
};

export default {
  signin,
  signup,
  signout,
  requireSignin,
  hasAuthorization,
  isAdmin,
};
