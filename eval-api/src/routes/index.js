const app = require('express');
const router = app.Router();
const userRouter = require('./user.route');
const managerRouter = require('./manager.route');
const golfRouter = require('./golf.route');
const authRouter = require('./auth.route');

router.use(userRouter);
router.use(managerRouter);
router.use(golfRouter);
router.use(authRouter);

module.exports = router;
