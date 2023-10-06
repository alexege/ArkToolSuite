const { timer } = require("../models");
const db = require("../models");
const User = require("../models/user.model");
const Timer = require("../models/timer.model");

exports.addTimer = (req, res) => {
    console.log("req.body:", req.body);
    const timer = new Timer({
        name: req.body.name,
        creator: req.body.creator,
        img: req.body.img,
        type: req.body.type
    });

    timer.save()
    .then((timer) => {
        if(req.body.creator) {
            User.findOne({ _id:  { $in: req.body.creator }})
            .then((creator) => {
                timer.creator = creator;
                timer.save()
                .catch((e) => {
                    console.log('error:', e);
                })
            })
            .catch((e) => {
                console.log('error:', e);
            })
        }
        //To be reactive, this must return a timer object
        res.status(200).send(timer);
    })
    .catch((e) => {
        console.log('error:', e);
    })
}

exports.updateTimer = (req, res) => {
    console.log("updating timer from controller:", req.body);
    let data = {
        name: req.body.name,
        img: req.body.img
    }
    Timer.findByIdAndUpdate({ _id: req.params.id }, data)
    .then(timer => {
        res.status(200).send({ timer })
    })
    .catch(err => {
        res.status(500).send({ message: err })
    })
}

exports.deleteTimer = (req, res) => {
    Timer.deleteOne({ _id: req.params.id })
    .then((timer) => {
        res.status(200).send({ message: `${timer.name} timer deleted` })
    })
    .catch((e) => {
        console.log("error:", e);
    })
};

exports.allTimers = (req, res) => {
    Timer.find()
    .then((timers) => {
        res.status(200).send(timers)
    })
    // .sort([['createdAt', 'descending']])
    .catch((e) => {
        console.log("error:", e);
    })
}