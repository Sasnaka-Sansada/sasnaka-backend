const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const sponsorController = require('../api/sponsor');

router.post('/sponsor/create', sponsorController.PostCreateSponsor);
router.get('/sponsor/list', sponsorController.GetListSponsor);

module.exports = router;
