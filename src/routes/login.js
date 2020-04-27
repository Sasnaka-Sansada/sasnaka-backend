const router = require('express').Router();

const LoginController = require('../api/login');

router.get('/', LoginController.Login);

module.exports = router;
