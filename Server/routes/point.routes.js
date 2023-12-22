const controller = require("../controllers/point.controller")

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.get("/api/point/all", controller.findAllPoints)

    app.post("/api/point/addPoint", controller.addPoint)

    app.delete("/api/point/deletePoint/:id", controller.deletePoint)

    // app.post("/api/map/addPoint", controller.addPoint)
}