const mongoose = require("mongoose");

const Layout = mongoose.model(
    "Layout",
    new mongoose.Schema({
        title: String,
        url: String,
        items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }]
    },
    { timestamps: true})
)

module.exports = Layout;