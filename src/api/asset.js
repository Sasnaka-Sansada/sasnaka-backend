const AssetService = require('../services/asset');
const { FileValidator } = require('../validators/file_validator');

/**
 * Controller which manages assets
 * @abstract
 * @category Controllers
 */
class EventController {
  /**
   * Uploads an image
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PutUploadImage(req, res, next) {
    try {
      const { fileError, image } = FileValidator(req.files);
      if (fileError) throw fileError;
      const imageUrl = await AssetService.UploadImage(image);
      res.send(imageUrl).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Uploads an document
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PutUploadDocument(req, res, next) {
    try {
      const { fileError, document } = FileValidator(req.files);
      if (fileError) throw fileError;
      const documentUrl = await AssetService.PutUploadDocument(document);
      res.send(documentUrl).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EventController;
