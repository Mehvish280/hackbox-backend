const express = require("express");
const router = express.Router();
const Theory = require("../models/Theory");

// Get theory by subTopicId
router.get("/:subTopicId", async (req, res) => {
  try {
    const theory = await Theory.findOne({
      subTopicId: req.params.subTopicId,
    });

    if (!theory) {
      return res.status(404).json({ message: "Theory not found" });
    }

    res.json(theory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;