const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const resourceController = require('../api/resource');

router.post('/resource/create', resourceController.PostCreateResource);
router.get('/resource/list', resourceController.GetListResource);

module.exports = router;
