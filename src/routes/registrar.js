const router = require('express').Router();
const { IsPermittedMiddleware } = require('../loaders/authenticator');
const RegistrarController = require('../api/registrar');
const {
  Administrator,
} = require('../database/models/role');

router.post('/invite', IsPermittedMiddleware(Administrator), RegistrarController.PostInviteUsers);

module.exports = router;
