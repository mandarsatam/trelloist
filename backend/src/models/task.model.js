const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  // user: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  board : { type: mongoose.Schema.Types.ObjectId, ref: "board" }, 
  list: { type: mongoose.Schema.Types.ObjectId, ref: "list", required: true },
  title: { type: String, required: true },
  status: { type: Boolean, required: true},
  scheduleDate: { type: String, required: true }
});

module.exports = mongoose.model("todo", todoSchema);
