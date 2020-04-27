
/**
 * Controller which manages login
 * @abstract
 * @category Controllers
 */
class LoginController {
  /**
   * Logs a user into the system
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async Login(req, res, next) {
    try {
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
