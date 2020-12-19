// const passport = require('passport');
const Errors = require('../helpers/errors');
/**
 * This should be added as an middleware
 * before any permission checking middlewares.
 * @category Middlewares
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {NextFunction} next Next callback
 * */
// const AuthMiddleware = () => passport.authenticate('local');

const IsLoggedMiddleware = () => (req, res, next) => {
  const { authenticated } = req;
  if (!authenticated) throw new Errors.Unauthorized('Not logged in');
  next();
};

const IsNotLoggedMiddleware = () => (req, res, next) => {
  const { authenticated } = req;
  if (authenticated) throw new Errors.Forbidden('Already logged in');
  next();
};

const IsPermittedMiddleware = (roles) => (req, res, next) => {
  try {
    if (req.user) {
      if ((roles.includes(req.user.roleId))) {
        next();
      } else {
        throw new Errors.Unauthorized('Insufficient Permissions');
      }
    } else {
      throw new Errors.Unauthorized('Not logged in');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  IsLoggedMiddleware, IsPermittedMiddleware, IsNotLoggedMiddleware,
};
