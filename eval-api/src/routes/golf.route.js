const app = require('express');
const golf = require('../controllers/golf.controller');
const router = app.Router();
const token = require('../jwt/token.jwt');

router.post('/golf', token.auth, golf.create);
router.get('/golf', golf.findAll);
router.get('/golf/:id', golf.findOne);
router.put('/golf/:id', token.auth, golf.update);
router.delete('/golf/:id', token.auth, golf.deleteOne);
router.delete('/golf', token.auth, golf.deleteMany)

module.exports = router;
