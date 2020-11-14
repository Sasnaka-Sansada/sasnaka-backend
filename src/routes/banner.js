const router = require('express').Router();
const bannerController = require('../api/banner');
const {
  Administrator, EditorLevelA, EditorLevelB,
} = require('../database/models/role');
const { IsPermittedMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');

router.post('/create', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB]), bannerController.PostCreateBanner);
router.delete('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB]), bannerController.DeleteDeleteBanner);
router.get('/list', bannerController.GetListBanners);
router.put('/:id', IsLoggedMiddleware(), IsPermittedMiddleware([Administrator, EditorLevelA, EditorLevelB]), bannerController.PutUpdateBanner);

module.exports = router;
