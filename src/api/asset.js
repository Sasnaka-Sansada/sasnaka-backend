const AssetService = require('../services/asset');
const { ImageValidator, DocumentValidator } = require('../validators/file_validator');
const Errors = require('../helpers/errors');

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
      const valid = ImageValidator(req.files);
      if (!valid) {
        throw new Errors.BadRequest('Unacceptable image format');
      }
      const imageUrls = await AssetService.UploadImage({ images: req.files });
      res.send(imageUrls).status(200);
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
      const valid = DocumentValidator(req.files);
      if (!valid) {
        throw new Errors.BadRequest('Unacceptable document format');
      }
      const documentUrls = await AssetService.UploadDocument({ documents: req.files });
      res.send(documentUrls).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EventController;
