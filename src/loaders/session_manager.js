const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('../helpers/sequelize-singleton');
const config = require('../config');

const SessionManagerMiddleware = () => {
  const extendDefaultFields = (defaults, sessionInstance) => ({
    data: defaults.data,
    expires: defaults.expires,
    userId: sessionInstance.userId,
  });

  return session({
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
