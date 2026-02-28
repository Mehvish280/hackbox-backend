const express = require("express");
const router = express.Router();
const Path = require("../models/Path");  // ✅ Correct model file

// Get all paths
router.get("/", async (req, res) => {
  try {
    const paths = await Path.find();
    res.json(paths);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;