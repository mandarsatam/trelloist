const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  // user: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  listTitle: { type: String, required: true },
  board : { type: mongoose.Schema.Types.ObjectId, ref: "board" },
});

module.exports = mongoose.model("list", listSchema);
