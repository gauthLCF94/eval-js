const app = require('express');
const auth = require('../controllers/auth.controller');
const router = app.Router();

router.post('/auth/signin', auth.signin);
router.post('/auth/login', auth.login);

module.exports = router;
