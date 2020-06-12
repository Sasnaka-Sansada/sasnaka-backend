const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const projectController = require('../api/project');

router.post('/', projectController.PostCreateProject);
router.delete('/:id', projectController.DeleteDeleteProject);

module.exports = router;
