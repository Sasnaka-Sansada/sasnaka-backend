const RegistrarService = require('../services/registrar');
const { Invitation } = require('../validators/registrar');

/**
 * Controller which manages login
 * @abstract
 * @category Controllers
 */
class RegistrarController {
  /**
   * Logs a user into the system
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostInviteUsers(req, res, next) {
    try {
      const { value, error } = Invitation.validate(req.body);
      if (error) throw (error);
      RegistrarService.InviteUsers(value);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RegistrarController;
