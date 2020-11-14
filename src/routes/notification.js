const router = require('express').Router();
const {
  Administrator, EditorLevelA,
} = require('../database/models/role');
const { IsPermittedMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const coordinatorController = require('../api/notification');

router.get('/list', coordinatorController.GetListNotifications);
router.post('/create', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA]), coordinatorController.PostCreateNotification);
router.delete('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA]), coordinatorController.DeleteDeleteNotification);
router.get('/:id', coordinatorController.GetGetNotification);
router.put('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA]), coordinatorController.PutUpdateNotification);

module.exports = router;
