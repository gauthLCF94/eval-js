const Manager = require('../models/manager.model');

exports.create = (req, res) => {
  const manager = new Manager({
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    email: req.body.email,
    phone: req.body.phone,
  });
  manager.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
}

exports.findAll = (req, res) => {
  Manager.find()
    .then(managers => {
      res.send(managers);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
}

exports.findOne = (req,res) => {
  Manager.findById(req.params.id)
    .then(manager => {
        if (!manager) {
          return res.status(404).send({
            message: "Manager not found"
          })
        }
        res.send(manager);
      })
      .catch(err => {
        return res.status(500).send({
          message: err.message
        })
      })
}

exports.update = (req, res) => {
  Manager.findByIdAndUpdate(req.params.id, req.body)
    .then(manager => {
      if (!manager) {
        return res.status(404).send({
          message: "Manager not found"
        })
      }
      Manager.findById(req.params.id)
          .then(newManager => {
            res.send({
              new_manager: newManager,
              old_manager: manager
            });
          })
    }).catch(err => {
      return res.status(500).send({
        message: err.message
      })
    })
}

exports.deleteOne = (req, res) => {
  Manager.findByIdAndRemove(req.params.id)
    .then(manager => {
      if(!manager) {
        return res.status(404).send({
          message: "Manager not found"
        })
      }
      res.send({
        message: `Manager known with ID : ${req.params.id} has been deleted successfully`
      })
    })
}

exports.deleteMany = (req, res) => {
  Manager.deleteMany((err) => {
    if (err)
      res.send(err);
    res.send("All managers have been removed.");
  });
}
