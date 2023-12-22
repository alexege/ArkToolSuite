const db = require("../models")
const Map = require("../models/map.model")
const Point = db.Point;

exports.findAllMaps = (req, res) => {
    Map.find()
    .populate("points")
    .then((maps) => {
        res.send(maps)
    })
    .catch((err) => {
        console.log("Error:", err)
    })
}

exports.addMap = (req, res) => {
    const map = new Map({
        title: req.body.mapName,
        url: req.body.mapUrl,
        bgUrl: req.body.mapBgUrl,
        points: []
    })

    map.save(map)
    .then((map) => {
        console.log("Added map: ", map)
        res.status(200).send(map)
    })
    .catch((err) => {
        console.log("Error:", err)
    })
}

exports.deleteMap = (req, res) => {
    console.log("Deleting map: ", req.body)
    Map.deleteOne({ _id: req.params.id})
    .then(() => {
        res.status(200).send({ message : "Map Deleted" })
    })
    .catch((e) => {
        res.status(500).send({ message: e })
    })
}

exports.deletePointFromMap = (req, res) => {
    Map.findOne({ _id: req.params.mapId})
    .then((map) => {
        map.points.pull(req.params.pointId)
        map.save(map)
        res.status(200).send({ message : "Points deleted from map" })
    })
    .catch((e) => {
        res.status(500).send({ message: e })
    })
}