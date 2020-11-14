const router = require('express').Router();
const eventController = require('../api/event');
const {
  Administrator, EditorLevelA, EditorLevelB, EditorLevelC,
} = require('../database/models/role');
const { IsPermittedMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');

router.get('/list/upcoming', eventController.GetListUpcomingEvents);
router.get('/list/latest', eventController.GetListLatestEvents);
router.get('/list/:projectId', eventController.GetListEventsOfAProject);
router.get('/list', eventController.GetListEvents);
router.post('/create', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC]), eventController.PostCreateEvent);
router.delete('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC]), eventController.DeleteDeleteEvent);
router.get('/:id', eventController.GetGetEvent);
router.put('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC]), eventController.PutUpdateEvent);

module.exports = router;
