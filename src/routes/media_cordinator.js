const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const MediaCordinatorController = require('../api/media_cordinator');

router.get('/list', MediaCordinatorController.GetListMediaCordinators);
router.post('/create', MediaCordinatorController.PostCreateMediaCordinator);
router.delete('/:id', MediaCordinatorController.DeleteDeleteMediaCordinator);
router.get('/:id', MediaCordinatorController.GetGetMediaCordinator);
router.put('/:id', MediaCordinatorController.PutUpdateMediaCordinator);

module.exports = router;
