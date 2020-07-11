const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const sponsorController = require('../api/sponsor');

router.post('/create', sponsorController.PostCreateSponsor);
router.get('/list', sponsorController.GetListSponsors);
router.post('/sharedemails', sponsorController.PostPostSharedEmails);
router.get('/sharedemails', sponsorController.GetListSharedEmails);

module.exports = router;
