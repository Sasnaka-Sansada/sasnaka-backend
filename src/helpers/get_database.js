const database = require('../database/models');
const logger = require('../loaders/logger');
const Errors = require('./errors');

/**
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
