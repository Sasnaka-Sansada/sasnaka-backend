const router = require('express').Router();
const authController = require('../api/authenticate');
const { IsNotLoggedMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');

router.post('/register', IsNotLoggedMiddleware(), authController.PostRegister);
router.post('/login', IsNotLoggedMiddleware(), authController.PostLogin);
router.get('/verify/:token', IsNotLoggedMiddleware(), authController.Verify);
router.get('/jwt', IsLoggedMiddleware(), authController.GetUserByAuthToken);

module.exports = router;
