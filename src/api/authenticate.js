const UserService = require('../services/user');
const { Registration, Login, RegistrationToken } = require('../validators/authenticate');

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
      const user = await UserService.RegisterUser(value);
      res.send(user).status(200);
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
      const user = await UserService.LoginUser(value);
      res.send(user).status(200);
    } catch (err) {
      next(err);
    }
  }

  /** DEPRICIATED
   * Logs out a user from the system
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async PostLogout(req, res, next) {
    try {
      req.logout();
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  /*
   * Gets user details from the request.user( created by the jwt middleware)
   * @static @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async GetUserByAuthToken(req, res, next) {
    try {
      const user = await UserService.GetUserByAuthToken(req.user);
      res.send(user).status(200);
    } catch (err) {
      next(err);
    }
  }

  /**
     * Uses an email token and returns user details of the associated user
     * @param {Request} req Request
     * @param {Response} res Response
     * @param {NextFunction} next Next callback
     */
  static async Verify(req, res, next) {
    try {
      const { value, error } = RegistrationToken.validate({ token: req.params.token });
      if (error) throw error;

      const registrationToken = await UserService
        .VerifyRegistrationToken(value.token);
      res.status(200).send(registrationToken);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = authController;
