const express = require("express");
const router = express.Router();
const SubTopic = require("../models/SubTopic");

// Get subtopics by pathId
router.get("/:pathId", async (req, res) => {
  const subTopics = await SubTopic.find({
    pathId: req.params.pathId
  });
  res.json(subTopics);
});

module.exports = router;