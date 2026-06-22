import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants.js";
import User from "../models/user.js";

export async function auth(req, res, next) {
  try {
    const { token } = req.cookies;
   

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not logged in"
      });
    }

    const { _id } = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }
   
    req.user = user; 
    next();

  } catch (error) {
    console.log("Error in auth middleware :::", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}