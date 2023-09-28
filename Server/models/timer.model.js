const mongoose = require("mongoose");

const Timer = mongoose.model(
    "Timer",
    new mongoose.Schema({
        name: String,
        type: String,
        startTime: String,
        endTime: String,
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        img: { 
            type: String
        }
    },
    { timestamps: true})
);

module.exports = Timer;