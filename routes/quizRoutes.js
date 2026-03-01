const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Quiz = require("../models/Quiz");

// Get quizzes by subTopicId
router.get("/:subTopicId", async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      subTopicId: new mongoose.Types.ObjectId(req.params.subTopicId),
    });

    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;