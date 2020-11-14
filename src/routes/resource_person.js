const router = require('express').Router();
const resourcePersonController = require('../api/resource_person');
const { IsLoggedMiddleware, IsPermittedMiddleware } = require('../loaders/authenticator');
const {
  Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD,
} = require('../database/models/role');

router.post('/create', resourcePersonController.PostCreateResourcePerson);
router.get('/list', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD]), resourcePersonController.GetListResourcePersons);
router.post('/sharedemails', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB]), resourcePersonController.PostPostSharedEmails);
router.get('/sharedemails', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD]), resourcePersonController.GetListSharedEmails);

module.exports = router;
