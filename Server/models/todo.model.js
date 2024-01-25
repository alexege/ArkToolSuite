const mongoose = require("mongoose");
// mongoose.set('debug', true);
// var autoPopulateChildren = function(next) {
//     this.populate('comments')
//     next()
// }

const Todo = mongoose.model(
    "Todo",
    new mongoose.Schema({
        title: String,
        category: String,
        priority: String,
        completed: Boolean,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    },
    { timestamps: true})
    // .pre('find', autoPopulateChildren)
    // .pre('findOne', autoPopulateChildren)
)

module.exports = Todo;