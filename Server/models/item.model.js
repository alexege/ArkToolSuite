const mongoose = require("mongoose");

const Item = mongoose.model(
    "Item",
    new mongoose.Schema({
        title: String,
        url: String,
        description: String,
        gridPosition: Number
    },
    { timestamps: true})
)

module.exports = Item;