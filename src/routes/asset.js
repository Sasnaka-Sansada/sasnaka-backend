const router = require('express').Router();
const assetController = require('../api/asset');
const {
  Administrator, EditorLevelA, EditorLevelB, EditorLevelC,
} = require('../database/models/role');
const { IsPermittedMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');


router.put('/image', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC]), assetController.PutUploadImage);
router.put('/document', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB, EditorLevelC]), assetController.PutUploadDocument);

module.exports = router;
