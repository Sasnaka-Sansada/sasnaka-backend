const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const resourcePersonController = require('../api/resource_person');

router.post('/create', resourcePersonController.PostCreateResourcePerson);
router.get('/list', resourcePersonController.GetListResourcePersons);

module.exports = router;
