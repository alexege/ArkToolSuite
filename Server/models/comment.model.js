const mongoose= require("mongoose");

const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author'
        },
        title: String,
        body: String,
        comments: []
    },
    { timestamps: true})
)

module.exports = Comment;