const controller = require("../controllers/comment.controller");
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/comment/allComments", controller.getAllComments)

    app.post("/api/comment/:commentId", controller.addCommentToComment)
    
    app.post("/api/comment/todo/:todoId", controller.addCommentToTodo)

    app.delete("/api/comment/:id", controller.deleteComment)
}