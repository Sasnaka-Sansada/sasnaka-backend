const SponsorService = require('../services/sponsor');
const {
  CreateSponsor,
} = require('../validators/sponsor');

/**
 * Controller which manages sponsors
 * @abstract
 * @category Controllers
 */
class SponsorController {
  /**
   * Creates a sponsor
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostCreateSponsor(req, res, next) {
    try {
      const { value, error } = CreateSponsor.validate(req.body);
      if (error) throw (error);
      const sponsor = await SponsorService.CreateSponsor(value);
      res.send(sponsor).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Gets a sponsor
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListSponsors(req, res, next) {
    try {
      const sponsors = await SponsorService.ListSponsors();
      res.send(sponsors).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SponsorController;
