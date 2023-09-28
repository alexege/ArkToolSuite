const controller = require("../controllers/timer.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/timers/all", controller.allTimers);
    app.post("/api/timers/add", controller.addTimer);
    app.patch("/api/timers/update/:id", controller.updateTimer);
    app.delete("/api/timers/delete/:id", controller.deleteTimer);
}