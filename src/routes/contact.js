const router = require('express').Router();
const contactController = require('../api/contact');
const {
  Administrator, EditorLevelA,
} = require('../database/models/role');
const { IsPermittedMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');

router.put('/', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA]), contactController.PutUpdateContact);
router.get('/', contactController.GetGetContact);

module.exports = router;
