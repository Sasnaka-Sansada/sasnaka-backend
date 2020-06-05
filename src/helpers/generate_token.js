const cryptoRandomString = require('crypto-random-string');

/**
 *
 * @param {Integer} length of the token
 * @returns {String} token generated
 */
const generateToken = (length) => cryptoRandomString({ length, type: 'url-safe' });

module.exports = { generateToken };
