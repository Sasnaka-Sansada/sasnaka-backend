const router = require('express').Router();
const userController = require('../api/user');
const { IsLoggedMiddleware, IsPermittedMiddleware } = require('../loaders/authenticator');
const {
  Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD,
} = require('../database/models/role');

router.get('/list', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD]), userController.GetListUsers);
router.get('/sharableemails/list', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD]), userController.GetListEmailSharableUsers);
router.get('/account/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD]), userController.GetGetUser);
router.put('/account/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD]), userController.PutUpdateUser);
router.put('/role', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator]), userController.PutUpdateRole);

module.exports = router;
