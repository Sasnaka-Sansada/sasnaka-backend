const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const coordinatorController = require('../api/cordinator');

router.get('/list', coordinatorController.GetListCordinators);
router.post('/create', coordinatorController.PostCreateCordinator);
router.delete('/:id', coordinatorController.DeleteDeleteCordinator);
router.get('/:id', coordinatorController.GetGetCordinator);
router.put('/:id', coordinatorController.PutUpdateCordinator);

module.exports = router;
