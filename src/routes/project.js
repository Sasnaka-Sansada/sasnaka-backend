const router = require('express').Router();
const projectController = require('../api/project');
const {
  Administrator, EditorLevelA, EditorLevelB,
} = require('../database/models/role');
const { IsPermittedMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');

router.get('/list/:pillerId', projectController.GetListProjectsOfAPiller);
router.get('/list', projectController.GetListProjects);
router.post('/create', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB]), projectController.PostCreateProject);
router.delete('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB]), projectController.DeleteDeleteProject);
router.get('/:id', projectController.GetGetProject);
router.put('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB]), projectController.PutUpdateProject);

module.exports = router;
