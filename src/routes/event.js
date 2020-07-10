const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const eventController = require('../api/event');

router.get('/list/upcoming', eventController.GetListUpcomingEvents);
router.get('/list/latest', eventController.GetListLatestEvents);
router.get('/list/:projectId', eventController.GetListEventsOfAProject);
router.get('/list', eventController.GetListEvents);
router.post('/create', eventController.PostCreateEvent);
router.delete('/:id', eventController.DeleteDeleteEvent);
router.get('/:id', eventController.GetGetEvent);
router.put('/:id', eventController.PutUpdateEvent);

module.exports = router;
