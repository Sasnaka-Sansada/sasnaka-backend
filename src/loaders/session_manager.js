const expressSession = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);
const sequelize = require('../helpers/sequelize-singleton');
const config = require('../config');

/**
 * Session initialization middleware
 * @returns {Object} session
 * @category Middlewares
 */
const SessionManagerMiddleware = () => {
  const extendDefaultFields = (defaults, session) => ({
    data: defaults.data,
    expires: defaults.expires,
    userId: (session.passport && session.passport.user) ? session.passport.user : null,
  });

  return expressSession({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
    },
    store: new SequelizeStore({
      db: sequelize,
      table: 'Session',
      extendDefaultFields,
    }),
  });
};

module.exports = { SessionManagerMiddleware };
