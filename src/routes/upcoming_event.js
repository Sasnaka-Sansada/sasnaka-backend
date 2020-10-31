const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const upcomingEventController = require('../api/upcoming_event');

router.get('/list', upcomingEventController.GetListEvents);
router.post('/create', upcomingEventController.PostCreateEvent);
router.delete('/:id', upcomingEventController.DeleteDeleteEvent);
router.get('/:id', upcomingEventController.GetGetEvent);
router.put('/:id', upcomingEventController.PutUpdateEvent);
router.get('/list/range', upcomingEventController.GetListEventsInRange);

module.exports = router;
