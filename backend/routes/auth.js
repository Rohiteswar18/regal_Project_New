const express = require("express");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User");

// Utils
const verifyGoogleToken = require("../utils/googleVerify");

// Middleware
const profileAuth = require("../middleware/auth");

const router = express.Router();

/**
 * ---------------------------------------------------
 * GOOGLE LOGIN / SIGNUP
 * ---------------------------------------------------
 */
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token required" });
    }

    // 1️⃣ Verify Google identity
    const googleUser = await verifyGoogleToken(token);

    // 2️⃣ Check if user exists
    let user = await User.findOne({ googleId: googleUser.googleId });

    // ✅ EXISTING USER WITH PROFILE → LOGIN
    if (user && user.profileCompleted) {
      const jwtToken = jwt.sign(
        {
          userId: user._id,
          username: user.username,
          email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({ token: jwtToken, user });
    }

    // ❌ NEW USER → CREATE PARTIAL PROFILE
    if (!user) {
      user = await User.create({
        googleId: googleUser.googleId,
        email: googleUser.email,
        username: googleUser.name,
        picture: googleUser.picture,
        profileCompleted: false
      });
    }

    // 3️⃣ TEMP TOKEN FOR PROFILE COMPLETION
    const tempToken = jwt.sign(
      { userId: user._id, type: "profile" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({
      needsProfile: true,
      tempToken,
      googleProfile: {
        email: user.email,
        username: user.username,
        picture: user.picture
      }
    });
  } catch (err) {
    console.error("Google auth error:", err.message);
    res.status(401).json({ message: "Google authentication failed" });
  }
});

/**
 * ---------------------------------------------------
 * COMPLETE USER PROFILE
 * ---------------------------------------------------
 */
router.post("/complete-profile", profileAuth, async (req, res) => {
  const { phone, location, username } = req.body;

  if (!phone || !location || !username) {
    return res.status(400).json({ message: "All fields required" });
  }

  const user = await User.findById(req.userId);

  if (!user || user.profileCompleted) {
    return res.status(400).json({ message: "Invalid request" });
  }

  user.phone = phone;
  user.location = location;
  user.username = username;
  user.profileCompleted = true;

  await user.save();

  // ✅ REAL LOGIN TOKEN (with username & email)
  const jwtToken = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token: jwtToken, user });
});

/**
 * ---------------------------------------------------
 * GET CURRENT USER
 * ---------------------------------------------------
 */
router.get("/me", profileAuth, async (req, res) => {
  const user = await User.findById(req.userId).select("-__v");
  res.json(user);
});

module.exports = router;
