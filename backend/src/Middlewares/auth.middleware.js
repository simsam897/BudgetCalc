import { Auth } from "../models/auth.model.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({
        message: "unauthorized",
      });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    const user = await Auth.findById(decoded.id).select("-password");

    req.user = user._id;

    next();
  } catch (error) {
    return res.status(403).json({
      message: error.message,
    });
  }
};
