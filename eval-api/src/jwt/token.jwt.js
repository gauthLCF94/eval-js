const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send({
      auth:false,
      message:"No token was found"
    })
  }
  jwt.verify(token, "supersecret", function(err, decoded) {
    if (err) {
      return res.status(401).send({
        auth:false,
        message:"Authorisation denied"
      })
    }
    next();
  })
}
