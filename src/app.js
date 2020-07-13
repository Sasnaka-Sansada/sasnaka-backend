const express = require('express');
const passport = require('passport');
const multer = require('multer');
const configurations = require('./config');
const routes = require('./routes');
const logger = require('./helpers/logger');
const { passportConfig } = require('./config/passport');
const { ErrorHandlerMiddleware } = require('./loaders/error_handler');
const { SessionManagerMiddleware } = require('./loaders/session_manager');
const { initialize } = require('./loaders/initial_setup');
const { initializeCloudinary } = require('./loaders/initialize_cloudinary');

const app = express();

// initialize cloudinary
initializeCloudinary();

// applying the middleware for parsing request bodies
app.use(require('body-parser').json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
const upload = multer();
app.use(upload.any());
app.use(express.static('public'));
app.use(express.static('public/uploads'));

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

// initial db configuation
initialize();

// routing
routes.endPointsHandler(app);

// error handler middleware
app.use(ErrorHandlerMiddleware);

// listening to the server port
app.listen(configurations.port, () => {
  logger.info('Sasnaka backend up and running');
});

// 404 error handler
app.use((req, res) => {
  res.status(404).send({ message: '404 route not found' });
});
