// backend/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * REGISTER USER
 * POST /api/auth/register
 */
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name || "",
            email,
            passwordHash: hashedPassword,
            xp: 0,
            badges: []
        });

        await newUser.save();

        return res.json({ message: 'Registration successful!' });

    } catch (err) {
        console.error('Register Error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

/**
 * LOGIN USER
 * POST /api/auth/login
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
        );

        return res.json({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                xp: user.xp,
                badges: user.badges
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ message: 'Server error' });
    }
});

/**
 * GET PROFILE (Protected)
 * GET /api/auth/profile
 */
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-passwordHash");
        return res.json(user);
    } catch (err) {
        console.error("Profile Error:", err);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
