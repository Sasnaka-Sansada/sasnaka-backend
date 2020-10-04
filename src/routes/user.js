const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const userController = require('../api/user');

router.get('/list', userController.GetListUsers);
router.get('/sharableemails/list', userController.GetListEmailSharableUsers);
router.get('/account/:id', userController.GetGetUser);
router.put('/account/:id', userController.PutUpdateUser);
router.put('/role', userController.PutUpdateRole);

module.exports = router;
