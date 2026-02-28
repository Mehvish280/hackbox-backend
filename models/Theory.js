const mongoose = require("mongoose");

const theorySchema = new mongoose.Schema({
  subTopicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubTopic"
  },
  content: String
});

module.exports = mongoose.model("Theory", theorySchema);