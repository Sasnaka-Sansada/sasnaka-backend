const router = require('express').Router();
// const { AuthMiddleware, IsLoggedMiddleware } = require('../loaders/authenticator');
const bannerController = require('../api/banner');

router.post('/create', bannerController.PostCreateBanner);
router.delete('/:id', bannerController.DeleteDeleteBanner);
router.get('/list', bannerController.GetListBanners);
router.put('/:id', bannerController.PutUpdateBanner);

module.exports = router;
