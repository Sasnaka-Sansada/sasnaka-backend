const BannerService = require('../services/banner');
const {
  CreateBanner, UpdateBanner, BannerId,
} = require('../validators/banner');

/**
 * Controller which manages banner
 * @abstract
 * @category Controllers
 */
class BannerController {
  /**
   * Creates a banner
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostCreateBanner(req, res, next) {
    try {
      const { value, error } = CreateBanner.validate(req.body);
      if (error) throw (error);
      const banner = await BannerService.CreateBanner(value);
      res.send(banner).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Deletes a banner
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async DeleteDeleteBanner(req, res, next) {
    try {
      const { value, error } = BannerId.validate({ id: req.params.id });
      if (error) throw (error);
      await BannerService.DeleteBanner(value);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Updates a banner
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PutUpdateBanner(req, res, next) {
    try {
      const { value, error } = UpdateBanner.validate({ ...req.body, id: req.params.id });
      if (error) throw (error);
      const banner = await BannerService.UpdateBanner(value);
      res.send(banner).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Lists all banners
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListBanners(req, res, next) {
    try {
      const banners = await BannerService.ListBanners();
      res.send(banners).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BannerController;
