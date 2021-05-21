const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  boardName : {type:String, required:true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
});

module.exports = mongoose.model("board", boardSchema);
