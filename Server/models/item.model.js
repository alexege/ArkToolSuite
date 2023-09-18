const mongoose = require("mongoose");

const Item = mongoose.model(
    "Item",
    new mongoose.Schema({
        title: String,
        url: String,
        description: String,
        gridPosition: Number,
        layout: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Layout'
        },
        unique: Boolean
    },
    { timestamps: true})
)

module.exports = Item;