require('dotenv').config();

const databaseConnection = {
  development: {
    username: process.env.DEV_USER || 'postgres',
    password: process.env.DEV_PWD || null,
    database: process.env.DEV_DB || 'sasnaka',
    host: process.env.DEV_HOST || '127.0.0.1',
    port: process.env.DEV_PORT || '3306',
    dialect: process.env.DEV_DIALECT || 'mysql',
    operatorsAliases: '0',
  },
  test: {
    username: process.env.TEST_USER || 'postgres',
    password: process.env.TEST_PWD || null,
    database: process.env.TEST_DB || 'sasnaka_sansada',
    host: process.env.TEST_HOST || '127.0.0.1',
    port: process.env.TEST_PORT || '3306',
    dialect: process.env.TEST_DIALECT || 'mysql',
    operatorsAliases: '0',
  },
  production: {
    username: process.env.PROD_USER || 'postgres',
    password: process.env.PROD_PWD || null,
    database: process.env.PROD_DB || 'sasnaka',
    host: process.env.PROD_HOST || '127.0.0.1',
    port: process.env.PROD_HOST || '3306',
    dialect: process.env.PROD_DIALECT || 'mysql',
    operatorsAliases: '0',
  },
};

module.exports = databaseConnection;
