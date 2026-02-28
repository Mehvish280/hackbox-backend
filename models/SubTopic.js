const mongoose = require("mongoose");

const subTopicSchema = new mongoose.Schema({
  pathId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Path"
  },
  title: String,
  readTime: Number
});

module.exports = mongoose.model("SubTopic", subTopicSchema);