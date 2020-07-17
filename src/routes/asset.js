const router = require('express').Router();
const assetController = require('../api/asset');

router.put('/image', assetController.PutUploadImage);
router.put('/document', assetController.PutUploadDocument);

module.exports = router;
