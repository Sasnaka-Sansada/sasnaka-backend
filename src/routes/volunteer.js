const router = require('express').Router();
const volunteerController = require('../api/volunteer');
const { IsLoggedMiddleware, IsPermittedMiddleware } = require('../loaders/authenticator');
const {
  Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD,
} = require('../database/models/role');

router.post('/create', volunteerController.PostCreateVolunteer);
router.get('/list', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD]), volunteerController.GetListVolunteers);

module.exports = router;
