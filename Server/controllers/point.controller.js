const db = require("../models")
const Point = require("../models/point.model")
const Map = db.map;

exports.findAllPoints = (req, res) => {
    Point.find()
    .then((maps) => {
        res.send(maps)
    })
    .catch((err) => {
        console.log("Error:", err)
    })
}

exports.addPoint = (req, res) => {
    console.log("addPoint - req.body: ", req.body)
    console.log("x:", req.body.x)
    console.log("y:", req.body.y)

    const point = new Point({
        mapX: req.body.mapX,
        mapY: req.body.mapY,
        x: req.body.x,
        y: req.body.y
    })

    point.save()
    .then((newPoint) => {

        Map.findOne({ _id: req.body.mapId})
        .then((map) => {
            map.points.push(newPoint)
            map.save(map)
            .then((data) => { // Data will be the updated map
                res.status(200).send(newPoint)
            })
        })
        .catch((e) => {
            console.log("error:", e)
        })

    })
    .catch((err) => {
        console.log("Error:", err)
    })
}

exports.deletePoint = (req, res) => {
    Point.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).send({ message: "Point Deleted" })
    })
    .catch((e) => {
        res.status(500).send({ message: e })
    })
}