const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config();

const app = express();

// ===================== ROUTES REQUIRE (IMPORTANT ORDER) =====================
const theoryRoutes = require("./routes/theoryRoutes");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const aiRoutes = require("./routes/aiRoutes");
const pathRoutes = require("./routes/pathRoutes");
const subTopicRoutes = require("./routes/subTopicRoutes");

// ===================== SEED IMPORT =====================
const seedDatabase = require("./seedData");

// ===================== MIDDLEWARES =====================
app.use(cors());
app.use(express.json());

// ===================== ROUTE MOUNT =====================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/paths", pathRoutes);
app.use("/api/subtopics", subTopicRoutes);
app.use("/api/theory", theoryRoutes);   // ✅ Correct Position

// ===================== HEALTH CHECK =====================
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// ===================== TEST ROUTE =====================
app.get("/", (req, res) => {
  res.send("🚀 HackBox API is running!");
});

// ===================== DATABASE + SERVER START =====================
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    await seedDatabase();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));