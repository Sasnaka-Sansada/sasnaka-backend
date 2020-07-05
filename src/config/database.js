require('dotenv').config();

const databaseConnection = {
  development: {
    username: process.env.DEV_USER || 'postgres',
    password: process.env.DEV_PWD || 'newuser',
    database: process.env.DEV_DB || 'sasnaka',
    host: process.env.DEV_HOST || '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: '0',
  },
  test: {
    username: process.env.TEST_USER || 'postgres',
    password: process.env.TEST_PWD || 'newuser',
    database: process.env.TEST_DB || 'sasnaka',
    host: process.env.TEST_HOST || '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: '0',
  },
  production: {
    username: process.env.PROD_USER || 'postgres',
    password: process.env.PROD_PWD || 'newuser',
    database: process.env.PROD_DB || 'sasnaka',
    host: process.env.PROD_HOST || '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: '0',
  },
};

module.exports = databaseConnection;
