import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import User from "../models/user.model.js"; // make sure path is correct
import config from "../../config/config.js";

const JWT_SECRET = "mySuperSecret123!";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // For testing purposes, plain text (replace with bcrypt in prod)
    const isMatch = password === user.password;
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "Signed out successfully" });
};

// Middleware
export const requireSignin = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth",
});

export const hasAuthorization = (req, res) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) return res.status(403).json({ error: "User is not authorized" });
  return res.status(200).end();
};
