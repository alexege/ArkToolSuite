const db = require("../models");
const User = require("../models/user.model");
const Todo = db.todo;
const Comment = db.comment;

// Retrieve all Todos from the database.
exports.findAllTodos = (req, res) => {
  Todo.find().populate("author")
  // .sort([["gridPosition", "ascending"]])
  .then((todos) => {
    console.log(":::::::::::::::::::::::todos:", todos)
    res.status(200).send(todos);
  })
  .catch((e) => {
    console.log("error:", e);
  })
  
  // .sort([["createdAt", "descending"]])
};

// Create and Save a new Todo
exports.addTodo = (req, res) => {
    console.log("addTodo - - controller", req.body)
    const todo = new Todo({
      title: req.body.title,
      category: req.body.category,
      priority: req.body.priority,
      completed: req.body.completed,
      author: req.body.author
    });

    if(req.body.author){
        User.findOne({ _id: req.body.author })
        .then((user) => {
          console.log("user found:", user);
            todo.author = user
            todo.save(todo)
            .then(item => {
                console.log("saveTodo:", item)
                res.status(200).send(item)
              })
              .catch(err => {
                console.log("err:", err);
              })
        })
        .catch((e) => {
          console.log("error:", e);
        })
  }

  // const todo = new Todo({
  //   title: req.body.title,
  //   url: req.body.url,
  //   description: req.body.description,
  //   // gridPosition: count + 1
  // });

  // todo.save(todo)
  // .then(data => {
  //   res.send(data)
  // })
  // .catch(err => {
  //   console.log("err:", err);
  // })
};

// Find a single Todo with an id
exports.findById = (req, res) => {
  Todo.findOne({ _id: req.params.id })
  .then((todo) => {
    res.send({ todo });
  })
  .catch(err => {
    res.status(500).send({ message: err });
    return;
  })
};

// Update a Todo by the id in the request
exports.updateTodo = (req, res) => {

  let updateData = {
    completed: !req.body.completed
  };

  console.log("updateData:", updateData);

  Todo.findByIdAndUpdate({ _id: req.params.id }, updateData)
  .then(todo => {
    console.log("final updated item: ", todo.completed);
    res.status(200).send({ todo });
  })
  .catch(err => {
    res.status(500).send({ message: err });
  })
};

// Delete a Todo with the specified id in the request
exports.deleteTodo = (req, res) => {
  Todo.deleteOne({ _id: req.params.id })
  .then(() => {
    res.status(200).send({ message: "Todo deleted"});
  })
  .catch(err => {
    res.status(500).send({ message: err });
    return;
  })
};

// Delete all Todos from the database.
exports.deleteTodos = (req, res) => {
  
};

exports.addComment = (req, res) => {

  console.log("addComment req.body:", req.body)
  console.log("addComment req.params:", req.params)

  const comment = new Comment ({
    // title: req.body.title,
    body: req.body.body,
    // category: req.body.category,
    // priority: req.body.priority,
    // completed: req.body.completed,
    author: req.body.author || 'authorName'
  })

  //Find the Todo this comment belongs to and add it
  Todo.findOne({ _id: req.params.id })
  .then((todo) => {
    console.log("new todo found? ", todo)



    // if (req.body.author) {
    //   User.findOne({ _id: req.body.author })
    //   .then((user) => {
    //     console.log("Author found:", user)
  
    //     todo.author = user
    //     todo.save(todo)
    //     .then((comment) => {
    //       console.log("Saving comment:", comment)
    //     })
    //     .catch((err) => {
    //       console.log("error: ", err)
    //     })
    //   })
    //   .catch((e) => {
    //     console.log("error: ", e)
    //   })
    // }





    todo.comments.push(comment)
    todo.save(todo)
    .then(comment => {
      console.log("Saving comment: ", comment)
      res.status(200).send(comment)
    })
    .catch((err) => {
      console.log("error:", err)
    })
  })
  .catch((err) => {
    console.log("error:", err)
  })

  // const todo = new Todo({
  //   title: req.body.title,
  //   category: req.body.category,
  //   priority: req.body.priority,
  //   completed: req.body.completed
  // });

  // if(req.body.assignee){
  //     User.findOne({ _id: req.body.assignee })
  //     .then((user) => {
  //       console.log("user found:", user);
  //         todo.assignee = user
  //         todo.save(todo)
  //         .then(item => {
  //             console.log("saveTodo:", item)
  //             res.status(200).send(item)
  //           })
  //           .catch(err => {
  //             console.log("err:", err);
  //           })
  //     })
  //     .catch((e) => {
  //       console.log("error:", e);
  //     })
// }
};