const mongoose = require("mongoose");

const Point = mongoose.model(
    "Point",
    new mongoose.Schema({
        color: String,
        title: String,
        category: String,
        x: Number,
        y: Number,
        mapX: Number,
        mapY: Number,
        map: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'map'
        },
    },
    { timestamps: true})
);

module.exports = Point;