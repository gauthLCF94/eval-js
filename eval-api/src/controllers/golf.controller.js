const Golf = require('../models/golf.model');
const Manager = require('../models/manager.model');

exports.create = (req, res) => {
  Manager.findOne({
    lastname: req.body.managerLastname,
    firstname: req.body.managerFirstname
  })
  .then((manager => {
    if (!manager) {
      return res.status(404).send({
        message: "Manager not found"
      })
    }
    let myManager = manager;
  }));

  const golf = new Golf({
    title: req.body.title,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    description: req.body.description,
    manager: myManager
  });

  golf.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      })
    });
}

exports.findAll = (req, res) => {
  Golf.find()
    .then(golfs => {
      res.send(golfs);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
}

exports.findOne = (req,res) => {
  Golf.findById(req.params.id)
    .then(golf => {
        if (!golf) {
          return res.status(404).send({
            message: "Golf not found"
          })
        }
        res.send(golf);
      })
      .catch(err => {
        return res.status(500).send({
          message: err.message
        })
      })
}

exports.update = (req, res) => {
  Golf.findByIdAndUpdate(req.params.id, req.body)
    .then(golf => {
      if (!golf) {
        return res.status(404).send({
          message: "Golf not found"
        })
      }
      Golf.findById(req.params.id)
          .then(newGolf => {
            res.send({
              new_golf: newGolf,
              old_golf: golf
            });
          })
    }).catch(err => {
      return res.status(500).send({
        message: err.message
      })
    })
}

exports.deleteOne = (req, res) => {
  Golf.findByIdAndRemove(req.params.id)
    .then(golf => {
      if(!golf) {
        return res.status(404).send({
          message: "Golf not found"
        })
      }
      res.send({
        message: `Golf known with ID : ${req.params.id} has been deleted successfully`
      })
    })
}

exports.deleteMany = (req, res) => {
  Golf.deleteMany((err) => {
    if (err)
      res.send(err);
    res.send("All Golfs have been removed.");
  });
}
