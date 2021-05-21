const express = require("express");
const Board = require("../models/board.model");
const List = require("../models/list.model");
const Task = require("../models/task.model");
const SubTask = require("../models/subTask.model");
const router = express.Router();
const User = require("../models/user.model");
const { deleteOne } = require("../models/board.model");


// *************** User ********************
//Register for admin
router.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(200).json({data: user});
})

router.get("/users", async (req, res)=>{
  const users = await User.find({}).lean().exec();
  res.status(200).json({data: users});
})


// *************** Board ********************
//Create Board for a user
router.post("/board", async (req, res) => {
  req.body.user = req.body.userId;
  const board = await Board.create(req.body);
  res.status(200).json({ data: board });
});

router.get("/board/:userId/", async (req, res) => {
  const boards = await Board.find({user : userId}).lean().exec()
  res.status(200).json({ data: boards})
})

router.get("/board", async (req, res) => {
  const boards = await Board.find({}).lean().exec()
  res.status(200).json({ data: boards})
})


// *************** Lists ********************
// Add list to the boardSchema
router.post("/lists", async (req, res) => {
  req.body.board = req.body.boardId;
  const list = await List.create(req.body);
  res.status(200).json({data: list});
})

//Get lists
router.get("/lists/:boardId", async (req, res) => {
  const lists = await List.find({ board: req.params.boardId }).exec()
  res.status(200).json({data: lists});
})

router.get("/lists", async (req, res) => {
  const lists = await List.find({})
  res.status(200).json({data: lists});
})

//Update Title of the Lists
router.patch("/lists", async (req, res) => {
  const list = await List.findByIdAndUpdate(req.body.id, {
    listTitle : req.body.title
  })
  res.status(200).json({data: list});
})

//Delete Lists
router.delete("/lists", async (req, res) => {
  const list = await List.findByIdAndDelete(req.body.id);
  res.status(200).json({data: list})
})


// *************** Task ********************
//Add task to a list
router.post("/task", async (req, res) => {
  req.body.board = req.body.boardId;
  req.body.list = req.body.listId;

  const task = await Task.create(req.body);

  res.status(200).json({data: task});
})

//Get task by boardId
router.get("/task/:boardId", async (req, res) => {
  const task = await Task.find({ board: req.params.boardId })
  res.status(200).json({data: task});
})

//Change Status, Parent list, schedule date of the task
router.patch("/task", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.body.id, {
    status : req.body.status,
    scheduleDate : req.body.scheduleDate,
    list: req.body.listId,
    title : req.body.title
  }, {new: true})
  res.status(200).json({data: task});
})

//Delete a Task
router.delete("/task", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.body.id);
  res.status(200).json({data: task});  
})


// *************** Sub-Task ********************
//Get subtask by id
router.get("/subTask/:boardId", async (req, res) => {
  const subTask = await SubTask.find({ board: req.params.boardId })
  res.status(200).json({data: subTask});
})

//Get all subtasks
router.get("/subTask", async (req, res)=>{
  const subtask = await SubTask.find({});
  res.status(200).json({data: subtask});
})

//Add Subtask to a task
router.post("/subTask", async (req, res) => {
  req.body.board = req.body.boardId;
  req.body.list = req.body.listId;
  req.body.task = req.body.taskId;

  const subTask = await SubTask.create(req.body);
  res.status(200).json({data: subTask});
})


//Update Status of subTask
router.patch("/subTask", async (req, res) => {
  const subTask = await SubTask.findByIdAndUpdate(req.body.id, {
    status : req.body.status
  }, {new: true})
  res.status(200).json({data: subTask});
})

//Delete Subtask of a task
router.delete("/subTask", async (req, res) => {

  const subTask = await SubTask.findByIdAndDelete(req.body.id);

  res.status(200).json({data: subTask});
})

module.exports = router;








// const protect = require("../middlewares/protect");
// const authorization = require("../middlewares/authorization");

// const { user, admin } = require("../utils/constants");