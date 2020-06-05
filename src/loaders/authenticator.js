const passport = require('passport');
const Errors = require('../helpers/errors');
/**
 * This should be added as an middleware
 * before any permission checking middlewares.
 * @category Middlewares
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {NextFunction} next Next callback
 * */
const AuthMiddleware = () => passport.authenticate('local');

const IsLoggedMiddleware = () => (req, res, next) => {
  try {
    if (req.user) {
      next();
    } else {
      throw new Errors.Unauthorized('Not logged in');
    }
  } catch (err) {
    next(err);
  }
};

const IsPermittedMiddleware = (roleId) => (req, res, next) => {
  try {
    if (req.user && roleId === req.user.roleId) {
      next();
    } else {
      throw new Errors.Unauthorized('Insufficient Permissions');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { AuthMiddleware, IsLoggedMiddleware, IsPermittedMiddleware };
