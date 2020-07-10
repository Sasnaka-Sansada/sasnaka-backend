const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const sponsorController = require('../api/sponsor');

router.post('/create', sponsorController.PostCreateSponsor);
router.get('/list', sponsorController.GetListSponsors);

module.exports = router;
