const db = require("../models");
const User = require("../models/user.model");
const Todo = db.todo;
const Comment = db.comment;

// Retrieve all Todos from the database.
exports.findAllTodos = async (req, res) => {

  Todo.find({}).lean().populate('author')
  .then((todos) => {
    res.status(200).send(todos);
  })
  .catch((e) => {
    console.log("error:", e);
  })
};

// Create and Save a new Todo
exports.addTodo = (req, res) => {
  
  const newTodo = new Todo({
    title: req.body.title,
    category: req.body.category,
    priority: req.body.priority,
    completed: req.body.completed,
    author: null
  })

  User.findOne({ _id: req.body.author })
  .then((user) => {
    newTodo.author = user
    newTodo.save()
    .then((todo) => {
      res.status(200).send(todo)
    })
  })
};

// // Create and Save a new Todo
// exports.addTodo = (req, res) => {
//   console.log("req.body.author:", req.body.author)

//     const todo = new Todo({
//       title: req.body.title,
//       category: req.body.category,
//       priority: req.body.priority,
//       completed: req.body.completed,
//       author: req.body.author
//     });

//     //https://teamtreehouse.com/community/how-to-assign-a-user-a-post-with-mongoose-and-express

//     if(req.body.author){
//         User.findOne({ _id: req.body.author })
//         .then((user) => {
//           console.log("user found:", user);

//           user.todos.push(todo)
//           user.save()
//           .then((data) => {
//             console.log("save data:", data);

//             todo.author = user._id
//             console.log("the new todo is: ", todo)
//             todo.save(todo)
//             .then(item => {
//                 console.log("saveTodo:", item)
//                 res.status(200).send(item)
//               })
//               .catch(err => {
//                 console.log("err:", err);
//               })

//           })
//         })
//         .catch((e) => {
//           console.log("error:", e);
//         })
//   }

//   // const todo = new Todo({
//   //   title: req.body.title,
//   //   url: req.body.url,
//   //   description: req.body.description,
//   //   // gridPosition: count + 1
//   // });

//   // todo.save(todo)
//   // .then(data => {
//   //   res.send(data)
//   // })
//   // .catch(err => {
//   //   console.log("err:", err);
//   // })
// };

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

  Todo.findByIdAndUpdate({ _id: req.params.id }, updateData)
  .then(todo => {
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

  User.find({ _id: req.body.author })
  .then((foundUser) => {
    console.log("Found User: ", foundUser);

    Todo.findOne({ _id: req.params.id })
    .then((foundTodo) => {
      console.log("Found todo: ", foundTodo);

      const newComment = new Comment({
        author: req.body.author, //foundUser._id,
        body: req.body.body,
        comments: [],
        todo: req.params.id //foundTodo._id
      })

      newComment.save()
      .then((comment) => {
        console.log("Can we see the todo?", foundTodo);
        foundTodo.comments.push(comment)
        foundTodo.save()
        .then((todo) => {
          console.log("The end todo is: ", todo)
        })
        .catch((err) => { console.log("error: ", err)})
      })

    })

  })
}

  
  // Todo.findOne({ _id: req.params.id })
  // .then((todo) => {
  //   console.log("todo: ", todo)

  //   User.find({ _id: req.body.author })
  //   .then((user) => {
  //     console.log("found user is: ", user);

  //     todo.author = user._id
  //     todo.save()

  //     console.log("comments:", todo.comments);
  //     console.log("todo:", todo)

  //   })

    

    // const newComment = new Comment({
    //   body: req.body.body,
    //   comments: [],
    //   author: req.body.author
    //   // comments: req.body.comments
    // })

    // newComment.save()
    // console.log("newCOmment: ", newComment);

    // todo.comments.push(newComment)
    // todo.save()
    // console.log("todo:", todo)

    // .then((newComment) => {
      // console.log("new comment: ", newComment)

      // todo.comments.push(newComment)
      // console.log("todo:", todo)
      // todo.save()
    // })



    //   // console.log("newComment:", newComment)
  
    //   // todo.comments.push(newComment)
    //   // todo.save()
    //   // .then((todo) => {
    //     // console.log("Finished todo:", todo)
    //   // })

    // })
//   })
// }

// exports.addComment = (req, res) => {

//   const comment = new Comment ({
//     body: req.body.body,
//     comments: req.body.comments,
//     author: null
//   })
//   console.log("author id: ", req.body.author.trim())

//   // console.log("Verdict:", mongoose.Types.ObjectId.isValid(req.body.author))


//   User.findOne({ _id: req.body.author })
//   .then((user) => {
//     comment.author = user
//     comment.save()
//     .then((comment) => {
//       // console.log("user:", user)

//       //Find the Todo this comment belongs to and add it
//     Todo.findOne({ _id: req.params.id })
//     .then((todo) => {
//       todo.comments.push(comment)
//       console.log("todo found:", todo)
//       todo.save(todo)
//       .then((data) => {
//         console.log("data:", data)
//         res.status(200).send(data)
//       })
//       .catch((e) => {
//         console.log("error: ", e)
//       })
//     })
//     .catch((e) => {
//       console.log("error: ", e)
//     })


//     })
//   })














  // comment.save()
  // .then((comment) => {
  //   console.log("Saved the new comment: ", comment)
    
  //   //Find the Todo this comment belongs to and add it
  //   Todo.findOne({ _id: req.params.id })
  //   .then((todo) => {
  //     console.log("Found a todo: ", todo)
  //     todo.comments.push(comment)
  //     console.log("todo:", todo)
  //     todo.save(todo)
  //     .then((data) => {
  //       res.status(200).send(data)
  //     })
  //     .catch((e) => {
  //       console.log("error: ", e)
  //     })
  //   })
  //   .catch((e) => {
  //     console.log("error: ", e)
  //   })
  // })
  // .catch((e) => {
  //   console.log("error: ", e)
  // })
// }

  // //Find the Todo this comment belongs to and add it
  // Todo.findOne({ _id: req.params.id })
  // .then((todo) => {

  //   // if (req.body.author) {
  //   //   User.findOne({ _id: req.body.author })
  //   //   .then((user) => {
  //   //     console.log("Author found:", user)
  
  //   //     todo.author = user
  //   //     todo.save(todo)
  //   //     .then((comment) => {
  //   //       console.log("Saving comment:", comment)
  //   //     })
  //   //     .catch((err) => {
  //   //       console.log("error: ", err)
  //   //     })
  //   //   })
  //   //   .catch((e) => {
  //   //     console.log("error: ", e)
  //   //   })
  //   // }

  //   todo.comments.push(comment)
  //   todo.save(todo)
  //   .then(comment => {
  //     console.log("Saving comment: ", comment)
  //     res.status(200).send(comment)
  //   })
  //   .catch((err) => {
  //     console.log("error:", err)
  //   })
  // })
  // .catch((err) => {
  //   console.log("error:", err)
  // })

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
// };