const router = require('express').Router();
const coordinatorController = require('../api/cordinator');
const {
  Administrator, EditorLevelA, EditorLevelB,
} = require('../database/models/role');
const { IsPermittedMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');

router.get('/list', coordinatorController.GetListCordinators);
router.post('/create', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB]), coordinatorController.PostCreateCordinator);
router.delete('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB]), coordinatorController.DeleteDeleteCordinator);
router.get('/:id', coordinatorController.GetGetCordinator);
router.put('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB]), coordinatorController.PutUpdateCordinator);

module.exports = router;
