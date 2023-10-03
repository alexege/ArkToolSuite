const mongoose = require("mongoose");

const Todo = mongoose.model(
    "Todo",
    new mongoose.Schema({
        title: String,
        priority: String,
        completed: Boolean,
        assignee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    { timestamps: true})
)

module.exports = Todo;