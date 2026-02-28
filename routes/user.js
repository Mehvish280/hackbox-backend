const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ CORRECT IMPORT (THIS IS THE FIX)
const authMiddleware = require("../middleware/authMiddleware");

// ===================== UPDATE PROGRESS =====================
router.post("/progress", authMiddleware, async (req, res) => {

  try {
    const { xp, streak, badges } = req.body;

    // req.user.id MUST exist
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 INCREMENT XP (BACKEND SOURCE OF TRUTH)
    user.xp = (user.xp || 0) + (xp || 0);

    // Update streak if provided
    if (typeof streak === "number") {
      user.streak = streak;
    }

    // Add badges safely
    if (Array.isArray(badges) && badges.length > 0) {
      badges.forEach((b) => {
        if (!user.badges.includes(b)) {
          user.badges.push(b);
        }
      });
    }

    await user.save();

    return res.json({
      message: "Progress updated",
      xp: user.xp,
      streak: user.streak,
      badges: user.badges,
    });
  } catch (err) {
    console.error("Progress update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
