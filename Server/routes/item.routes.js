const controller = require("../controllers/item.controller");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/items/all", controller.findAllItems);

    app.post("/api/items/addItem", controller.addItem);

    //:id is the param that is passed and will be later accessed with req.params.id
    app.patch("/api/items/update/:id", controller.update);

    app.delete("/api/items/delete/:id", controller.delete);
}