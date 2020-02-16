const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
  let hashedPwd = bcrypt.hashSync(req.body.password, 8);
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    role: req.body.role,
    email: req.body.email,
    password: hashedPwd,
    admin: req.body.admin
  });
  user.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      })
    });
}

exports.findAll = (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
}

exports.findOne = (req,res) => {
  User.findById(req.params.id)
    .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User not found"
          });
        }
        res.send(user);
      })
      .catch(err => {
        return res.status(500).send({
          message: err.message
        })
      })
}

exports.update = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body
  ).then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found"
        })
      }
      User.findById(req.params.id)
          .then(newUser => {
            res.send({
              new_user: newUser,
              old_user: user
            });
          })
    }).catch(err => {
      return res.status(500).send({
        message: err.message
      })
    })
}

exports.deleteOne = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      if(!user) {
        return res.status(404).send({
          message: "User not found"
        })
      }
      res.send({
        message: `User known with ID : ${req.params.id} has been deleted successfully`
      })
    })
}

exports.deleteMany = (req, res) => {
  User.deleteMany((err) => {
    if (err) {
      res.send(err)
    }
    res.send("All users have been removed.");
  });
}
