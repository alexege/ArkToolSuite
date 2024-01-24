const db = require("../models");
const User = db.user;
const Role = db.role;

var bcrypt = require("bcryptjs");

exports.allUsers = (req, res) => {
    User.find()
    .populate("roles", "-__v")
    .then((users) => {
        res.status(200).send(users)
    })
    .catch((e) => {
        console.log("error:", e)
    })
};

exports.getById = (req, res) => {
    User.findOne({ _id: req.params.id})
    
}

exports.signup = (req, result) => {
    const user = new User({
      // _id: req.body.signUpData.uid.slice(0, 24),
      authId: req.body.signUpData.uid,
      username: req.body.username,
      email: req.body.signUpData.email,
      password: bcrypt.hashSync(req.body.password, 8),
      img: req.body.img ? req.body.img : "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg"
    });

    user.save()
    .then((user) => {
      if(req.body.roles) {
        Role.find({ name: { $in: req.body.roles }})
        .then((roles) => {
          user.roles = roles.map(role => role._id)
          user.save()
          .then((res) => {
            result.status(200).send({ user })
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
          })
          .catch((err) => console.log("error:", err))
        })
        .catch((err) => console.log("error:", err))
      }
    })
    .catch((err) => console.log("error:", err))
  
  };