const UserService = require('../services/user');

/**
 * Controller which manages users
 * @abstract
 * @category Controllers
 */
class UserController {
  /**
   * Lists all users with email share capable roles
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetListEmailSharableUsers(req, res, next) {
    try {
      const users = await UserService.ListEmailSharableUsers();
      res.send(users).status(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
