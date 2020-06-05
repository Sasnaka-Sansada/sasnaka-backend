const router = require('express').Router();
const { AuthMiddleware } = require('../loaders/authenticator');
const authController = require('../api/authenticate');

router.post('/register', authController.PostRegister);
router.post('/login', AuthMiddleware(), authController.PostLogin);

module.exports = router;
