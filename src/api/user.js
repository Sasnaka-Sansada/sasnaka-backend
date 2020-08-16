const UserService = require('../services/user');
const {
  UserId, UpdateUser, UpdateRole,
} = require('../validators/user');

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

  /**
   * Get a user by id
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetGetUser(req, res, next) {
    try {
      const { value, error } = UserId.validate({ id: req.params.id });
      if (error) throw (error);
      const user = await UserService.GetUser(value);
      res.send(user).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Updates a user
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PutUpdateUser(req, res, next) {
    try {
      const { value, error } = UpdateUser.validate({ id: req.params.id, ...req.body });
      if (error) throw (error);
      const user = await UserService.UpdateUser(value);
      res.send(user).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Updates the role of a given list of users
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PutUpdateRole(req, res, next) {
    try {
      const { value, error } = UpdateRole.validate(req.body);
      if (error) throw (error);
      await UserService.UpdateRole(value);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
