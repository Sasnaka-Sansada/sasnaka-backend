const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const contactController = require('../api/contact');

router.put('/', contactController.PutUpdateContact);
router.get('/', contactController.GetGetContact);

module.exports = router;
