const mongoose = require("mongoose");

const Map = mongoose.model(
    "Map",
    new mongoose.Schema({
        title: String,
        url: String,
        bgUrl: String,
        points: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Point'
        }],
    },
    { timestamps: true})
);

module.exports = Map;