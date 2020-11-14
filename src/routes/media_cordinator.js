const router = require('express').Router();
const MediaCordinatorController = require('../api/media_cordinator');
const {
  Administrator, EditorLevelA,
} = require('../database/models/role');
const { IsPermittedMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');

router.get('/list', MediaCordinatorController.GetListMediaCordinators);
router.post('/create', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA]), MediaCordinatorController.PostCreateMediaCordinator);
router.delete('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA]), MediaCordinatorController.DeleteDeleteMediaCordinator);
router.get('/:id', MediaCordinatorController.GetGetMediaCordinator);
router.put('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA]), MediaCordinatorController.PutUpdateMediaCordinator);

module.exports = router;
