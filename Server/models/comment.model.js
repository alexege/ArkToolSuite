const mongoose= require("mongoose");

const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        body: String,
        comments: [],
        todo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todo'
        }
    },
    { timestamps: true})
)
//Added todo? Needed?
module.exports = Comment;