const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const volunteerController = require('../api/volunteer');

router.post('/create', volunteerController.PostCreateVolunteer);
router.get('/list', volunteerController.GetListVolunteers);

module.exports = router;
