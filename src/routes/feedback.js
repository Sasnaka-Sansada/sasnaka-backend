const router = require('express').Router();
const feedbackController = require('../api/feedback');
const {
  Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD,
} = require('../database/models/role');
const { IsPermittedMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');

router.post('/create', feedbackController.PostCreateFeedback);
router.put('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelD]), feedbackController.PutUpdateFeedback);
router.get('/list/visible', feedbackController.GetListVisibleFeedbacks);
router.get('/list', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD]), feedbackController.GetListFeedbacks);
router.post('/sharedemails', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelD]), feedbackController.PostPostSharedEmails);
router.get('/sharedemails', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC, EditorLevelD]), feedbackController.GetListSharedEmails);

module.exports = router;
