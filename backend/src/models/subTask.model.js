const mongoose = require("mongoose");

const subTaskSchema = new mongoose.Schema({
  board : { type: mongoose.Schema.Types.ObjectId, ref: "board", required: true },
  task : { type: mongoose.Schema.Types.ObjectId, ref: "task"},
  list : { type: mongoose.Schema.Types.ObjectId, ref: "list"},
  title: { type: String, required: true },
  status: { type: Boolean, required: true }
});

module.exports = mongoose.model("subTask", subTaskSchema);

