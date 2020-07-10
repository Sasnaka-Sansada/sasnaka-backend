const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const projectController = require('../api/project');

router.get('/list/:pillerId', projectController.GetListProjectsOfAPiller);
router.get('/list', projectController.GetListProjects);
router.post('/create', projectController.PostCreateProject);
router.delete('/:id', projectController.DeleteDeleteProject);
router.get('/:id', projectController.GetGetProject);
router.put('/:id', projectController.PutUpdateProject);

module.exports = router;
