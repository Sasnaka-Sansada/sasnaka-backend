const database = require('../database/models');
const logger = require('./logger');
const Errors = require('./errors');

/**
 * Returns a database object
 * @category Helpers
 * @returns {Object} database
 */
const getDatabase = async () => {
  try {
    return await database;
  } catch (error) {
    logger.error('Database connection issue');
    throw Errors.InternalServerError('Database connection issue');
  }
};

module.exports = { getDatabase };
