const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  priority: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  deadline: { type: Date, required: true },
});

module.exports = mongoose.model("Todo", todoSchema);
