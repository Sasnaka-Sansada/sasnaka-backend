const cryptoRandomString = require('crypto-random-string');

/**
 * Creates a url safe random token of a given length
 * @category Helpers
 * @param {Integer} length of the token
 * @returns {String} token generated
 */
const generateToken = (length) => cryptoRandomString({ length, type: 'url-safe' });

const generateFileName = (length) => cryptoRandomString({ length, type: 'numeric' });

module.exports = { generateToken, generateFileName };
