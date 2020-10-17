const router = require('express').Router();
const { AuthMiddleware, IsNotLoggedMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const authController = require('../api/authenticate');

router.post('/register', IsNotLoggedMiddleware(), authController.PostRegister);
router.post('/login', IsNotLoggedMiddleware(), AuthMiddleware(), authController.PostLogin);
router.post('/logout', IsLoggedMiddleware(), authController.PostLogout);
router.get('/session', IsLoggedMiddleware(), authController.GetUserBySessionId);


module.exports = router;
