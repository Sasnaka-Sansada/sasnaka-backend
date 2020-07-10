const logger = require('../helpers/logger');
const Errors = require('../helpers/errors');
const RegistrarService = require('../services/registrar');
const { Administrator } = require('../database/models/role');
const config = require('../config');

/**
 * Initialize by creating the first user
 * @category Helpers
 */
const initialize = async () => {
  if (config.initializeDatabase) {
    try {
      const value = { emailList: [config.email.organization_email], roleId: Administrator };
      await RegistrarService.InviteUsers(value);
      logger.info('Initial database setup completed');
    } catch (error) {
      logger.error('Initial setup failed');
      throw new Errors.InternalServerError('Initial setup failed');
    }
  }
};

module.exports = { initialize };
