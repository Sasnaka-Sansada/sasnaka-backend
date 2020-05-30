const router = require('express').Router();

const RegistrarController = require('../api/registrar');

router.post('/invite', RegistrarController.PostInviteUsers);

module.exports = router;
