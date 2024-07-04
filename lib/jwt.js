// lib/jwt.js
import jwt from "jsonwebtoken";

export const createToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
