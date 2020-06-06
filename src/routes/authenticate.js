const router = require('express').Router();
const { AuthMiddleware, IsNotLoggedMiddleware } = require('../loaders/authenticator');
const authController = require('../api/authenticate');

router.post('/register', IsNotLoggedMiddleware(), authController.PostRegister);
router.post('/login', IsNotLoggedMiddleware(), AuthMiddleware(), authController.PostLogin);

module.exports = router;
