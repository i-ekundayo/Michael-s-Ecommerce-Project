import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check that all fields were provided
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    // 2. Clean user input
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName) {
      return res.status(400).json({
        error: "Name cannot be empty",
      });
    }

    // 3. Validate password
    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters",
      });
    }

    // 4. Check if the email is already registered
    const existingUser = await User.findOne({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "Email is already registered",
      });
    }

    // 5. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Create the user
    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    // 7. Don't send the password back
    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong while registering",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check that both fields were provided
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // 2. Normalize the email
    const normalizedEmail = email.trim().toLowerCase();

    // 3. Find the user
    const user = await User.findOne({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // 4. Compare the password with the stored hash
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // 5. Create JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    // 6. Send token and safe user information
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong while logging in",
    });
  }
});

router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

export default router;
