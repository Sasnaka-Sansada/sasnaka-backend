const Sequelize = require('sequelize');
const logger = require('./logger');
const config = require('../config');

const env = config.env || 'development';
const databaseConfig = require('../config/database')[env];

const self = module.exports;
let sequelize;

/**
 * Singleton impl of returning a Sequelize instance
 * @category Helpers
 * @returns {Object} Sequelize
 */
exports.initialize = () => {
  if (!sequelize) {
    const options = {
      ...databaseConfig,
      define: { freezeTableName: true },
      logging: (msg) => logger.debug(msg),
    };

    if (databaseConfig.use_env_variable) {
      sequelize = new Sequelize(process.env[databaseConfig.use_env_variable], options);
    } else {
      sequelize = new Sequelize(
        databaseConfig.database, databaseConfig.username, databaseConfig.password, options,
      );
    }
  }

  return sequelize;
};

module.exports = self.initialize();
