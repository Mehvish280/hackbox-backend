const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config();

const app = express();

// ===================== MIDDLEWARES =====================
app.use(cors());
app.use(express.json());

// ===================== HEALTH CHECK =====================
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// ===================== ROUTES =====================
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ===================== TEST ROUTE =====================
app.get("/", (req, res) => {
    res.send("🚀 HackBox API is running!");
});

// ===================== DATABASE =====================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Error:", err));

// ===================== SERVER =====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
