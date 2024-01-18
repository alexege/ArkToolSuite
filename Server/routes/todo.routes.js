const controller = require("../controllers/todo.controller");
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/todo/all", controller.findAllTodos);
    
    app.get("/api/todo/:id", controller.findById);
    
    app.post("/api/todo/addTodo", controller.addTodo);
    
    app.patch("/api/todo/update/:id", controller.updateTodo);
    
    app.delete("/api/todo", controller.deleteTodos);
    
    app.delete("/api/todo/:id", controller.deleteTodo);
    
    //Comments
     app.post("/api/todo/addComment/:id", controller.addComment);
}

// const controller = require("../controllers/todo.controller");

// module.exports = (app) => {
//     app.use((req, res, next) => {
//         res.header(
//             "Access-Control-Allow-Headers",
//             "x-access-token, Origin, Content-Type, Accept"
//         );
//         next();
//     });

//     app.get("/api/todo/all", controller.findAllTodos);

//     app.post("/api/todo/addTodo", controller.addTodo);

//     //:id is the param that is passed and will be later accessed with req.params.id
//     app.patch("/api/todo/update/:id", controller.update);

//     app.delete("/api/todo/delete/:id", controller.delete);

//     //Comments
//      app.post("/api/todo/addTodo/:todoId", controller.addComment);
// }