const router = require('express').Router();
const upcomingEventController = require('../api/upcoming_event');
const { IsLoggedMiddleware, IsPermittedMiddleware } = require('../loaders/authenticator');
const {
  Administrator, EditorLevelA, EditorLevelC,
} = require('../database/models/role');

router.get('/list', upcomingEventController.GetListEvents);
router.post('/create', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelC]), upcomingEventController.PostCreateEvent);
router.delete('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelC]), upcomingEventController.DeleteDeleteEvent);
router.get('/:id', upcomingEventController.GetGetEvent);
router.put('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelC]), upcomingEventController.PutUpdateEvent);
router.get('/list/range', upcomingEventController.GetListEventsInRange);

module.exports = router;
