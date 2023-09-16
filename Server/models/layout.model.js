const mongoose = require("mongoose");

const Layout = mongoose.model(
    "Layout",
    new mongoose.Schema({
        title: String,
        url: String,
        items: []
    },
    { timestamps: true})
)

module.exports = Layout;