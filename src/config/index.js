const dotenv = require('dotenv');

const result = dotenv.config();

// throws error if configuration file error
if (result.error) {
  throw result.error;
}

/**
 * configurations contain all the environment variables in .env
 */
const configurations = {
  port: process.env.PORT || '8080',
  env: process.env.NODE_ENV || 'development',
  initializeDatabase: (process.env.INITIALIZE === 'true') || false,
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
  email: {
    sendgrid_api_key: process.env.SENDGRID_API_KEY,
  },
  saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
  sessionSecret: process.env.SESSION_SECRET,
};

module.exports = configurations;
