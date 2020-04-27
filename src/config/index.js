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
  port: process.env.PORT,
};

module.exports = configurations;
