const db = require("../models");
const User = require("../models/user.model");
const Todo = db.todo;
const Comment = db.comment;

// Retrieve all Todos from the database.
exports.findAllTodos = async (req, res) => {

  Todo.find({}).lean()
  // .populate({
  //   path: 'comments',
  //   model: 'Comment',
  //   populate: {
  //     path: 'comments',
  //       populate: {
  //         path: 'comments',
  //           populate: {
  //             path: 'comments',
  //             populate: {
  //               path: 'comments'
  //             }
  //           }
  //       }
  //   }
  // })
  // .populate("author")           https://stackoverflow.com/questions/73308388/mongoose-how-to-populate-field-from-recursive-schema
  
  //First layer populates the first instance of: <RecursiveComment>
  .populate({
    path: 'comments',
    model: 'Comment',
      
    populate: [{
        path: 'author',
        model: 'User', //No need to go deeper here (Would be populating inside author)
      },{
        path: 'comments',
        model: 'Comment',
          
          populate: [{
              path: 'author',
              model: 'User', //No need to go deeper here (Would be populating inside author)
            }
            ,{
              path: 'comments',
              model: 'Comment',
                populate: [{
                  path: 'author',
                  model: 'User' //No need to go deeper here (Would be populating inside author)
                },{
                  path: 'comments',
                  model: 'Comment',
                    populate: [{
                      path: 'author',
                      model: 'User' //No need to go deeper here (Would be populating inside author)
                    },{
                      path: 'comments',
                      model: 'Comment',
                        populate: {
                          path: 'author',
                          model: 'User' //No need to go deeper here (Would be populating inside author)
                        }
                    }]
                }]
            }
          ]
      }]
  })
  
  // .populate({
  //   path: 'comments',
  //   model: 'Comment',
    
  //   populate: {
  //     path: 'comments',
  //     model: 'Comment',
      
  //     populate: {
  //       path: 'author',
  //       model: 'User',
        
  //       populate: {
  //         path: 'comments',
  //         model: 'Comment',
          
  //         populate: {
  //           path: 'author',
  //           model: 'User',
  //         }
  //       }
  //     }
  //   }
  // })
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

exports.addComment = async (req, res) => {
  
  console.log("req.body:", req.body)
  // console.log("req.params:", req.params)

  user = await User.findById(req.body.comment.author._id)
  todo = await Todo.findById(req.params.id) //////////////////////// Probably scrwewd up
  console.log("todo:", todo)

  // Create a new Comment
  var newComment = new Comment(req.body.comment)
  
  // Add current logged in user as author
  newComment.author = user._id
  await newComment.save()
  
  let currentComment = await Comment.findById(req.body.id)
  console.log("currentComment:", currentComment)

  if (req.body.todoId) {

    console.log("attempting to add comment to comment")

    // For Nested Comments
    currentComment.comments.push(newComment)
    await currentComment.save()
    
    user.comments.push(newComment)
    await user.save()
  
  } else {

    console.log("attempting to add comment to todo")

    //For Todos
    todo.comments.push(newComment)
    await todo.save()
    user.comments.push(newComment)
    await user.save()
}
await res.status(200).send(newComment)
}

exports.deleteComment = async (req, res) => {
  Comment.findByIdAndDelete(req.params.id)
  .then(() => {
    res.status(200).send({ message: "Comment deleted"});
  })
  .catch(err => {
    res.status(500).send({ message: err });
    return;
  })
}

// exports.addComment = async (req, res) => {
  
//   console.log("req.body:", req.body)
//   // console.log("req.params:", req.params)

//   user = await User.findById(req.body.comment.author._id)
//   todo = await Todo.findById(req.params.id)

//   const comment = new Comment({
//     body: req.body.comment.body,
//     comments: [],
//   })
  
//   comment.author = user._id
//   await comment.save()

//   console.log("commentId:", req.body.commentId)

//   //For Todos
//   if (!req.body.commentId) {
    
//     todo.comments.push(comment)
//     await todo.save()
//     user.comments.push(comment)
//     await user.save()
//     await res.status(200).send(comment)
  
//   } else { 
//     console.log("within a comment")

//     let currentComment = await Comment.findById(req.body.commentId)
    
//     // For Nested Comments
//     currentComment.comments.push({
//       body: req.body.comment.body,
//       comments: []
//     })
//     await currentComment.save()
//     console.log("new new comment:", comment)
//     user.comments.push(comment)
//     await user.save()
//     await res.status(200).send(currentComment)
//   }
// }