const router = require('express').Router();
const teamMemberController = require('../api/team_member');
const { IsLoggedMiddleware, IsPermittedMiddleware } = require('../loaders/authenticator');
const {
  Administrator, EditorLevelA,
} = require('../database/models/role');

router.post('/create', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA]), teamMemberController.PostCreateTeamMember);
router.delete('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA]), teamMemberController.DeleteDeleteTeamMember);
router.put('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA]), teamMemberController.PutUpdateTeamMember);
router.get('/list', teamMemberController.GetListTeamMembers);


module.exports = router;
