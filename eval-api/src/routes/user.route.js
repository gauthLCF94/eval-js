const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const token = require('../jwt/token.jwt');

router.post('/users', token.auth, user.create);
router.get('/users', token.auth, user.findAll);
router.get('/users/:id', token.auth, user.findOne);
router.put('/users/:id', token.auth, user.update);
router.delete('/users/:id', token.auth, user.deleteOne);
router.delete('/users', token.auth, user.deleteMany);

module.exports = router;
