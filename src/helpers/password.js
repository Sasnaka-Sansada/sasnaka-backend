const bcrypt = require('bcryptjs');
const config = require('../config');

/**
 * Hashes a given password
 * @category Helpers
 * @param {String} password
 * @returns {String}
 */
const hashPassword = async (password) => bcrypt.hash(password, config.saltRounds);

/**
 * Compares a given password with the hash provided and returns true if similar
 * @category Helpers
 * @param {String} password
 * @param {String} hashedPassword
 * @returns {Boolean}
 */
const comparePassword = async (password, hashedPassword) => bcrypt.compare(
  password, hashedPassword,
);

module.exports = { hashPassword, comparePassword };
