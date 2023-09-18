const controller = require("../controllers/layout.controller");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/layouts/all", controller.findAllLayouts);

    app.get("/api/layouts/findOne/:id", controller.findOne);

    app.post("/api/layouts/addLayout", controller.addLayout);

    //:id is the param that is passed and will be later accessed with req.params.id
    app.patch("/api/layouts/update/:id", controller.update);

    app.delete("/api/layouts/delete/:id", controller.delete);
}