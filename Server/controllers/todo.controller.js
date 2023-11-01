const db = require("../models");
const User = require("../models/user.model");
const Todo = db.todo;

// Retrieve all Todos from the database.
exports.findAllTodos = (req, res) => {
  Todo.find()
  .populate("assignee")
  // .sort([["gridPosition", "ascending"]])
  .then((todos) => {
    res.send(todos);
  })
  .catch(err => {
    console.log(err);
  })
  
  // .sort([["createdAt", "descending"]])
};

// Create and Save a new Todo
exports.addTodo = (req, res) => {

    const todo = new Todo({
      title: req.body.title,
      category: req.body.category,
      priority: req.body.priority,
      completed: req.body.completed
    });

    if(req.body.assignee){
        User.findOne({ _id: req.body.assignee })
        .then((user) => {
          console.log("user found:", user);
            todo.assignee = user
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
exports.findOne = (req, res) => {
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
exports.update = (req, res) => {

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
exports.delete = (req, res) => {
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
exports.deleteAll = (req, res) => {
  
};