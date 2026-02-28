const express = require("express");
const { generateTheory } = require("../controllers/aiController");

console.log("✅ aiRoutes file loaded"); // 👈 DEBUG LINE

const router = express.Router();

// 🔹 TEST ROUTE (NO AI)
router.get("/test", (req, res) => {
  res.json({ ok: true });
});

// 🔹 THEORY GENERATION ROUTE
router.post("/theory", generateTheory);

module.exports = router;
