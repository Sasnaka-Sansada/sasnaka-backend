
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config');
const logger = require('../../helpers/logger');
const sequelize = require('../../helpers/sequelize-singleton');

const basename = path.basename(__filename);

/**
 * Creates database connection and returns the object
 * @async
 * @returns {Object} db database object
 */
const initializeDatabase = async () => {
  const db = {};

  // import all model schemas
  fs
    .readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') && (file !== 'role.js') && (file !== 'pillar.js'))
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  try {
  // Connect to database
    await sequelize.authenticate();
    if (config.initializeDatabase) {
      await sequelize.sync({ force: true });
    } else {
      await sequelize.sync();
    }
  } catch (err) {
    logger.error('Unable to connect to the database or create schema: ', err);
    throw err;
  }
  logger.info('Database connection has been established successfully.');

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};
module.exports = initializeDatabase();
