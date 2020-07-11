const SponsorService = require('../services/sponsor');
const {
  CreateSponsor, SharedEmailList,
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
   * Gets all sponsors
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

  /**
   * Posts the notification shared emails
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostPostSharedEmails(req, res, next) {
    try {
      const { value, error } = SharedEmailList.validate(req.body);
      if (error) throw (error);
      await SponsorService.PostSharedEmails(value);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Lists all notification shared emails
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListSharedEmails(req, res, next) {
    try {
      const emails = await SponsorService.ListSharedEmails();
      res.send(emails).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SponsorController;
