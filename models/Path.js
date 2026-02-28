const mongoose = require("mongoose");

const pathSchema = new mongoose.Schema({
  title: String,
  description: String
});

module.exports = mongoose.model("Path", pathSchema);