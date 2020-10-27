const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('./logger');

/**
 * Signs a user using the JWT secret.
 *
 * Here all the user details are signed.
 * User permissions and roles are also signed to
 * make authenticating fast.
 * As a result the token may need to be blacklisted if
 * the user permission/roles change.
 * @param {Object} user User details object
 * @param {string} user.id User id
 * @param {string} user.email User email address
 * @returns {string} signed JWT token
 */
const jwtSign = ({
  id, email,
}) => jwt.sign(
  {
    id,
    email,
  },
  config.jwtSecret,
);

/**
 * Synchronously verify given token using the secret key to get a decoded token.
 *
 * This returns the user object if successfull.
 * This throws as error upon failure.
 * @param {string} token JWT string to verify
 * @returns {user} The decoded token which contains user information.
 */
const jwtVerify = (token) => {
  let verification;
  try {
    verification = jwt.verify(token, config.jwtSecret);
  } catch (error) {
    logger.error(error);
  }
  return verification;
};

module.exports = { jwtSign, jwtVerify };
