const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const resourcePersonController = require('../api/resource_person');

router.post('/create', resourcePersonController.PostCreateResourcePerson);
router.get('/list', resourcePersonController.GetListResourcePersons);
router.post('/sharedemails', resourcePersonController.PostPostSharedEmails);
router.get('/sharedemails', resourcePersonController.GetListSharedEmails);

module.exports = router;
