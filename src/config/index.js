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
  domain: process.env.HOST_DOMAIN || '127.0.0.1',
  port: process.env.PORT || '8080',
  cookieDomain: process.env.COOKIE_DOMAIN || '.sasnaka.org',
  env: process.env.NODE_ENV || 'development',
  initializeDatabase: (process.env.INITIALIZE === 'true') || false,
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
  email: {
    sendgrid_api_key: process.env.SENDGRID_API_KEY || '',
    organization_email: process.env.ORGANIZATION_EMAIL || 'sasnakasansadasystem@gmail.com',
  },
  cloudinary: {
    cdn_upload: (process.env.CDN_UPLOAD === 'true') || false,
    name: process.env.CLOUDINARY_NAME || 'sasnaka-sansada',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    secret: process.env.CLOUDINARY_SECRET || '',
  },
  saltRounds: parseInt(process.env.SALT_ROUNDS, 10) || 10,
  sessionSecret: process.env.SESSION_SECRET || ' ',
  jwtSecret: process.env.JWT_SECRET || ' ',
  registerURL: process.env.REGISTERURL || '',
};

module.exports = configurations;
