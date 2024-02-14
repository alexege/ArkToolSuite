const db = require("../models");
const User = require("../models/user.model");
const Todo = db.todo;
const Comment = db.comment;

// Retrieve all Todos from the database.
exports.findAllTodos = async (req, res) => {

  Todo.find({})
  // .populate("comments")
  .populate("author")           //https://stackoverflow.com/questions/73308388/mongoose-how-to-populate-field-from-recursive-schema
  
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

// // Comments 

// exports.addComment = async (req, res) => {
//   console.log("add Comment To Todo")
//   try {
//       console.log("addCommentToTodo - req.body: ", req.body)
//       console.log("params:", req.params)

//       const newComment = new Comment(req.body)
//       const savedComment = await newComment.save()
//       console.log("new Comment:", savedComment)

//       const todoId = req.params.todoId

//       if(todoId) {
//           //Add comment to Todo
//           if (!mongoose.Types.ObjectId.isValid(todoId)) {
//               return res.status(400).json({ message: 'Invalid post ID' })
//           }
  
//           const todo = await Todo.findById(todoId)
  
//           if (!todo) {
//               return res.status(404).json({ message: 'Post not found' })
//           }
  
//           todo.comments.push(savedComment._id)
//           await todo.save()

//           // res.status(201).json({ message: 'Comment added successfully', comment: savedComment })
//           res.status(201).send(savedComment)
//       }

//   } catch (error) {
//       console.error(error)
//       res.status(500).json({ message: 'Internal Server Error' })
//   }
// }