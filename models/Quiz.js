const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  subTopicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubTopic"
  },
  question: String,
  options: [String],
  correctAnswer: String,
  difficulty: String
});

module.exports = mongoose.model("Quiz", quizSchema);