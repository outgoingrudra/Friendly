import isEmail from "validator/lib/isEmail.js";
import {
  convertHash,
  isPasswordSame,
  isValidPassword,
} from "../utils/utils.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants.js";
import { sendEmailToQueue } from "../queues/emailQueue.js";

export async function signup(req, res) {
  try {
    // basic checking
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Invalid Name , email or password ❌",
      });
    }
    email = email.trim();
    password = password.trim();
    name = name.trim();
    if (!name)
      return res.json({ success: false, message: "Name is required ❌" });
    if (isEmail(email) == false) {
      return res.json({ success: false, message: "Invalid email ❌" });
    }
    if (isValidPassword(password) == false) {
      return res.json({
        success: false,
        message: "Enter a Secure Password  ❌",
      });
    }

    // check already exist email or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already exists" });
    }
    const hashPassword = await convertHash(password);
    const user = new User({ name, email, password: hashPassword });
    await user.save();
    await sendEmailToQueue({
      type: "WELCOME",
      to: user.email,
      name: user.name,
    });

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      success: true,
      message: "User Created Successfully ✅",
      user: userObj,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal Server Error " });
  }
}

export async function login(req, res) {
  try {
    // basic checking
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Invalid  email or password ❌",
      });
    }
    email = email.trim();
    password = password.trim();
    if (isEmail(email) == false) {
      return res.json({ success: false, message: "Invalid email ❌" });
    }
    // check already exist email or not
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ success: false, message: "Invalid Credentials " });
    }
    // ✅ fix
    const isMatch = await isPasswordSame(password, existingUser.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ _id: existingUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    const safeUser = existingUser.toObject();
    delete safeUser.password;
    res.json({
      success: true,
      message: "User logged in Successfully ✅",
      user: safeUser,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal Server Error " });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.json({
      success: true,
      message: "Logged out successfully ✅",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
