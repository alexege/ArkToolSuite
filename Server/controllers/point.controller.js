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

    const point = new Point({
        color: req.body.point.color,
        title: req.body.point.title,
        category: req.body.point.category,
        description: req.body.point.description,
        x: req.body.point.x,
        y: req.body.point.y,
        mapX: req.body.point.mapX,
        mapY: req.body.point.mapY
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