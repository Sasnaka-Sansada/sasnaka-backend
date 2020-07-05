const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const teamMemberController = require('../api/team_member');

router.post('/create', teamMemberController.PostCreateTeamMember);
router.delete('/:id', teamMemberController.DeleteDeleteTeamMember);
router.put('/:id', teamMemberController.PutUpdateTeamMember);
router.get('/list', teamMemberController.GetListTeamMembers);


module.exports = router;
