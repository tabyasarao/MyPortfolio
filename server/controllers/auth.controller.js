import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt"; // notice: expressjwt (not expressJwt)

const JWT_SECRET = "your_secret_key_here"; // use your actual secret

export const signin = async (req, res) => {
  // your signin logic…
};

export const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "signed out" });
};

// ✅ Correct middleware:
export const requireSignin = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth", // puts decoded token in req.auth
});

// Authorization middleware
export const hasAuthorization = (req, res) => {
  const authorized =
    req.profile && req.auth && req.profile._id == req.auth._id;

  if (!authorized) {
    return res.status(403).json({ error: "User is not authorized" });
  }

  return res.status(200).end();
};
