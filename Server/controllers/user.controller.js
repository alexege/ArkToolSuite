const db = require("../models");
const User = db.user;

exports.allUsers = (req, res) => {
    console.log("fetching all users");
    User.find()
    .then((users) => {
        res.status(200).send(users)
    })
    .catch((e) => {
        console.log("error:", e)
    })
    // res.status(200).send("Public Content.");
  };

// exports.allAccess = (req, res) => {
//   User.find({}, (err, users) => {
//     if (err) {
//         res.status(500).send({ message: err });
//         return;
//     }
//     res.status(200).send({ users: users })
//   }).sort([['updatedAt', 'descending']])
// };