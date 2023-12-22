const controller = require("../controllers/map.controller")

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.get("/api/map/all", controller.findAllMaps)

    app.post("/api/map/addMap", controller.addMap)

    app.delete("/api/map/deleteMap/:id", controller.deleteMap)
    
    app.delete("/api/map/deletePointFromMap/:mapId/:pointId", controller.deletePointFromMap)
}