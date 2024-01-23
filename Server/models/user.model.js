const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        _id: String,
        username: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        img: String,
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        todos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Todo"
            }
        ],
    },
    { timestamps: true})
);

module.exports = User;