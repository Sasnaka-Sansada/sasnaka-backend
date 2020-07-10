const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const coordinatorController = require('../api/notification');

router.get('/list', coordinatorController.GetListNotifications);
router.post('/create', coordinatorController.PostCreateNotification);
router.delete('/:id', coordinatorController.DeleteDeleteNotification);
router.get('/:id', coordinatorController.GetGetNotification);
router.put('/:id', coordinatorController.PutUpdateNotification);

module.exports = router;
