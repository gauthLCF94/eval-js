const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    User.findOne({ email: req.body.email },
        function(err, user) {
            if (!user) {
              return res.status(404).send('User unknown');
            }
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
              return res.status(401).send({
                auth: false,
                token: null
              });
            }
            let token = jwt.sign({
                    id: user._id,
                    admin: user.admin
                },
                "supersecret", {
                    expiresIn: 3600
                }
            );
            res.status(200).send({
                auth: true,
                token: token,
                data: user
            })
        }
    )
}

exports.signin = (req, res) => {
  let hashedPwd = bcrypt.hashSync(req.body.password, 8);
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    role: req.body.role,
    email: req.body.email,
    password: hashedPwd,
    admin: req.body.admin
  })
  user.save()
    .then(data => {
        let token = jwt.sign({
                id: user.email,
                admin: user.admin
            },
            "supersecret", {
                expiresIn: 3600
            }
        )
        res.send({
            auth: true,
            token: token,
            body: {
                email: data.email,
                firstname: data.firstname
            }
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}
