const controller = require("../controllers/timer.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/timer/allTimers", controller.allTimers);
    app.post("/api/timer/addTimer", controller.addTimer);
    app.delete("/api/timer/deleteTimer/:id", controller.deleteTimer);
}