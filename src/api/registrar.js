const RegistrarService = require('../services/registrar');
const { Invitation } = require('../validators/registrar');

/**
 * Controller which manages inviting users
 * @abstract
 * @category Controllers
 */
class RegistrarController {
  /**
   * Invites a user into the system
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostInviteUsers(req, res, next) {
    try {
      const { value, error } = Invitation.validate(req.body);
      if (error) throw (error);
      await RegistrarService.InviteUsers(value);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RegistrarController;
