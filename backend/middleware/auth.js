import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // attach user info to request
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token." });
  }
};
