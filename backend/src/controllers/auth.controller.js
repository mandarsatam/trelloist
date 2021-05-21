const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const Board = require('../models/board.model')
const List = require('../models/list.model')

router.post("/authentication", async(req, res) => {
    const {name, email, imageUrl, googleId} = req.body;
    console.log(name, email, imageUrl, googleId);
    const userCheck = await User.find({userId : googleId}).exec()
    console.log(userCheck);
    if(userCheck.length == 0){
        const to_insert = {
            name : name,
            email : email,
            userId : googleId,
            imageUrl : imageUrl
        }
        await User.insertMany([to_insert])
        const userCheckConformation = await User.find({userId : googleId}).exec()
        const board = await Board.create({boardName: "Board1", user: userCheckConformation[0]._id});
        const list1 = await List.create({listTitle : "To Do", board : board._id});
        const list2 = await List.create({listTitle : "Doing", board : board._id});
        const list3 = await List.create({listTitle : "Done", board : board._id});
        userCheckConformation.push(board);
        res.status(200).json({data : userCheckConformation})
    }
    else{
        const board = await Board.find({user : userCheck[0]._id}).exec();
        console.log(board);
        userCheck.push(board[0]);
        res.status(200).json({data : userCheck})
    }
})

router.get("/authentication", async(req, res) => {
    res.status(200).json({data : ["something"]})
})



module.exports = router