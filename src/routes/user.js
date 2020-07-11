const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const userController = require('../api/user');

router.get('/sharableemails/list', userController.GetListEmailSharableUsers);

module.exports = router;
