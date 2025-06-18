import bcrypt from "bcrypt";
import { jwtGenerator } from "../JWT/jwtGenerator.js";
import User from "../models/User.js";

//USER SIGNUP
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All the fields should be filled" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password length should be atleast 8" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const saltRounds = parseInt(process.env.SALT_ROUND) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    if (user) {
      console.log("Successfully registered");
    }

    return res
      .status(201)
      .json({ message: `User ${user.name} is successfully registered.` });
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

// USER LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All the fields should be filled" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password length should be atleast 8" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const token = jwtGenerator({ user });

    return res
      .status(201)
      .json({ message: "Successfully logged in", user, token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
};
