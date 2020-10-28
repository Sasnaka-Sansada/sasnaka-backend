const router = require('express').Router();
const { IsNotLoggedMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const authController = require('../api/authenticate');

router.post('/register', IsNotLoggedMiddleware(), authController.PostRegister);
router.post('/login', IsNotLoggedMiddleware(), authController.PostLogin);
router.get('/verify/:token', IsNotLoggedMiddleware(), authController.Verify);
// router.post('/logout', IsLoggedMiddleware(), authController.PostLogout);
router.get('/jwt', IsLoggedMiddleware(), authController.GetUserByAuthToken);


module.exports = router;
