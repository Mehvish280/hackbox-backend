const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * UPDATE USER PROGRESS
 * POST /api/user/progress
 */
router.post("/progress", authMiddleware, async (req, res) => {
    try {
        const { xp, streak, badges } = req.body;

        // Find logged-in user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Add XP (increment)
        if (typeof xp === "number") {
            user.xp += xp;
        }

        // ✅ Update streak
        if (typeof streak === "number") {
            user.streak = streak;
        }

        // ✅ Add badges (avoid duplicates)
        if (Array.isArray(badges)) {
            badges.forEach((badge) => {
                if (!user.badges.includes(badge)) {
                    user.badges.push(badge);
                }
            });
        }

        // Save changes
        await user.save();

        return res.json({
            message: "Progress updated successfully",
            user: {
                xp: user.xp,
                streak: user.streak,
                badges: user.badges
            }
        });

    } catch (err) {
        console.error("Progress Update Error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
