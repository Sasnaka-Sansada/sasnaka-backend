const express = require('express');
const passport = require('passport');
const configurations = require('./config');
const routes = require('./routes');
const logger = require('./helpers/logger');
const { passportConfig } = require('./config/passport');
const { ErrorHandlerMiddleware } = require('./loaders/error_handler');
const { SessionManagerMiddleware } = require('./loaders/session_manager');

const app = express();

// applying the middleware for parsing request bodies
app.use(require('body-parser').json());

// connecting to the database
require('./database/models');

// session middleware
app.use(SessionManagerMiddleware());

// configure passport
passportConfig(passport);

// initialize passportjs
app.use(passport.initialize());

// use passport sessions
app.use(passport.session());

// routing
routes.endPointsHandler(app);

// error handler middleware
app.use(ErrorHandlerMiddleware);

// listening to the server port
app.listen(configurations.port, () => {
  logger.info('Sasnaka backend up and running');
});
