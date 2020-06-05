const bcrypt = require('bcrypt');
const config = require('../config');

const hashPassword = (password) => bcrypt.hash(password, config.saltRounds);

const comparePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

module.exports = { hashPassword, comparePassword };
