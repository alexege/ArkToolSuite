const db = require("../models");
const mongoose = require("mongoose")
const User = require("../models/user.model");
const Todo = db.todo;
const Comment = db.comment;

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find()
        .populate('comments')
        .populate('author')
        res.status(200).send(comments)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Internal Server Error' })
    }
    // Comment.find().lean()
    // .populate('author')
    // .then((comment) => {
    //     res.status(200).send(comment)
    // })
    // .catch((e) =>{
    //     console.log("error:", e)
    // })
}

exports.getComment = async (req, res) => {
    console.log("Getting comment by id: ", req.params)
    try {
        Comment.findById(req.params.commentId)
    } catch(error) {
        console.error(error)
    }
}

exports.addCommentToTodo = async (req, res) => {
    console.log("add Comment To Todo")
    try {
        console.log("addCommentToTodo - req.body: ", req.body)
        console.log("params:", req.params)

        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        console.log("new Comment:", savedComment)

        const todoId = req.params.todoId

        if(todoId) {
            //Add comment to Todo
            if (!mongoose.Types.ObjectId.isValid(todoId)) {
                return res.status(400).json({ message: 'Invalid post ID' })
            }
    
            const todo = await Todo.findById(todoId)
    
            if (!todo) {
                return res.status(404).json({ message: 'Post not found' })
            }
    
            todo.comments.push(savedComment._id)
            await todo.save()

            // res.status(201).json({ message: 'Comment added successfully', comment: savedComment })
            res.status(201).send(savedComment)
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

exports.addCommentToComment = async (req, res) => {
    console.log("addComment req.body: ", req.body.comment)
    console.log("addComment req.params: ", req.params)
    try {
    
        const { commentId, comment, author } = req.body

        const newComment = new Comment(req.body.comment)
        console.log("newComment:", newComment)

        const savedComment = await newComment.save()

        const todoId = req.params.todoId

        if (req.body.commentId) {
            let currentComment = await Comment.findById(req.body.commentId)
            console.log("CurrentComment:", req.body.commentId)
            currentComment.comments.push(savedComment)
            currentComment.save()
    
            // const todoStore = useTodoStore()
            // todoStore.fetchTodos()
            
            res.status(201).send(savedComment)
        } else {
            console.log("Attempting to add a comment to a todo")
        }


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id

        if(!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: 'Invalid comment ID' })
        }

        const deletedComment = await Comment.findByIdAndDelete(commentId)

        if (!deletedComment) {
            return res.status(400).json({ message: 'Comment not found' })
        }

        res.status(200).send({ message: 'Comment deleted successfully', deletedComment })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}