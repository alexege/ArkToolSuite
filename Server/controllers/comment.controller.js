const db = require("../models");
const User = require("../models/user.model");
const Todo = db.todo;
const Comment = db.comment;

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('author')
        res.status(200).json(comments)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
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

exports.addComment = async (req, res) => {
    console.log("addComment req.body: ", req.body)
    try {
        const todoId = req.params.id

        if (!mongoose.Types.ObjectId.isValid(todoId)) {
            return res.status(400).json({ message: 'Invalid post ID' })
        }

        const todo = await Todo.findById(todoId)

        if (!todo) {
            return res.status(404).json({ message: 'Post not found' })
        }

        const { id, comment, author } = req.body

        const newComment = new Comment(req.body.comment)
        console.log("newComment:", newComment)

        const savedComment = await newComment.save()

        todo.comments.push(savedComment._id)
        await todo.save()

        res.status(201).json({ message: 'Comment added successfully', comment: savedComment })
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

        res.status(200).json({ message: 'Comment deleted successfully', deletedComment })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}