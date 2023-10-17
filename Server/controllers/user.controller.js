const db = require("../models");
const User = db.user;
const Role = db.role;

var bcrypt = require("bcryptjs");

exports.allUsers = (req, res) => {
    console.log("fetching all users");
    User.find()
    .populate("roles", "-__v")
    .then((users) => {
        res.status(200).send(users)
    })
    .catch((e) => {
        console.log("error:", e)
    })
    // res.status(200).send("Public Content.");
};

exports.getById = (req, res) => {
    console.log("params:", req.params);
    User.findOne({ _id: req.params.id})
    
}

// exports.allAccess = (req, res) => {
//   User.find({}, (err, users) => {
//     if (err) {
//         res.status(500).send({ message: err });
//         return;
//     }
//     res.status(200).send({ users: users })
//   }).sort([['updatedAt', 'descending']])
// };


exports.signup = (req, result) => {
    // console.log("signupdata username:", req.body)

    const user = new User({
      _id: req.body.signUpData.uid,
      username: req.body.username,
      email: req.body.signUpData.email,
      password: bcrypt.hashSync(req.body.password, 8),
      img: req.body.img ? req.body.img : "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg"
    });

    console.log("user:", user)

    user.save()
    .then((user) => {
      if(req.body.roles) {
        Role.find({ name: { $in: req.body.roles }})
        .then((roles) => {
          user.roles = roles.map(role => role._id)
          user.save()
          .then((res) => {
            result.status(200).send({ user })
            // result.status(200).send({ message: "User registered successfully!" })
          })
          .catch((err) => console.log("error:", err))
        })
        .catch((err) => console.log("error:", err))
      } else {
        Role.findOne({ name: "user" })
        .then((role) => {
          user.roles = [role._id]
          user.save()
          .then((res) => {
            result.status(200).send({ user })
            // result.status(200).send({ message: "User registered successfully!" })
          })
          .catch((err) => console.log("error:", err))
        })
        .catch((err) => console.log("error:", err))
      }
    })
    .catch((err) => console.log("error:", err))
  
  };