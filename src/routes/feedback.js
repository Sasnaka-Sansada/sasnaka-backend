const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const feedbackController = require('../api/feedback');

router.post('/create', feedbackController.PostCreateFeedback);
router.put('/:id', feedbackController.PutUpdateFeedback);
router.get('/list/visible', feedbackController.GetListVisibleFeedbacks);
router.get('/list', feedbackController.GetListFeedbacks);
router.post('/sharedemails', feedbackController.PostPostSharedEmails);
router.get('/sharedemails', feedbackController.GetListSharedEmails);

module.exports = router;
