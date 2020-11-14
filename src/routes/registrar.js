const router = require('express').Router();
const RegistrarController = require('../api/registrar');
const { IsLoggedMiddleware, IsPermittedMiddleware } = require('../loaders/authenticator');
const {
  Administrator,
} = require('../database/models/role');

router.post('/invite', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator]), RegistrarController.PostInviteUsers);

module.exports = router;
