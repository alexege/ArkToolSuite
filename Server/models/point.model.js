const mongoose = require("mongoose");

const Point = mongoose.model(
    "Point",
    new mongoose.Schema({
        color: String,
        title: String,
        category: String,
        description: String,
        x: Number,
        y: Number,
        mapX: Number,
        mapY: Number,
        map: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Map'
        },
    },
    { timestamps: true})
);

module.exports = Point;