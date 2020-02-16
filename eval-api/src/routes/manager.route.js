const app = require('express');
const manager = require('../controllers/manager.controller');
const router = app.Router();
const token = require('../jwt/token.jwt');

router.post('/manager', token.auth, manager.create);
router.get('/manager', token.auth, manager.findAll);
router.get('/manager/:id', token.auth, manager.findOne);
router.put('/manager/:id', token.auth, manager.update);
router.delete('/manager/:id', token.auth, manager.deleteOne);
router.delete('/manager', token.auth, manager.deleteMany)

module.exports = router;
