const router = require('express').Router();
const sponsorController = require('../api/sponsor');
const { IsLoggedMiddleware, IsPermittedMiddleware } = require('../loaders/authenticator');
const {
  Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD,
} = require('../database/models/role');

router.post('/create', sponsorController.PostCreateSponsor);
router.get('/list', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD]), sponsorController.GetListSponsors);
router.post('/sharedemails', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB]), sponsorController.PostPostSharedEmails);
router.get('/sharedemails', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD]), sponsorController.GetListSharedEmails);

module.exports = router;
