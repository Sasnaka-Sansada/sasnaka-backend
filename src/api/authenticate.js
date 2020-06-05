const UserService = require('../services/user');
const { Registration, Login } = require('../validators/authenticate');

/**
 * Controller which manages registration
 * @abstract
 * @category Controllers
 */
class authController {
  /**
   * Registers a user into the system
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostRegister(req, res, next) {
    try {
      const { value, error } = Registration.validate(req.body);
      if (error) throw (error);
      await UserService.RegisterUsers(value);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Logs a user into the system
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostLogin(req, res, next) {
    try {
      const { value, error } = Login.validate(req.body);
      if (error) throw (error);
      await UserService.LoginUsers(value);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = authController;
