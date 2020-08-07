const express = require('express');
const passport = require('passport');
const multer = require('multer');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const { passportConfig } = require('./config/passport');
const { ErrorHandlerMiddleware } = require('./loaders/error_handler');
const { SessionManagerMiddleware } = require('./loaders/session_manager');
const { initialize } = require('./loaders/initial_setup');
const { initializeCloudinary } = require('./loaders/initialize_cloudinary');


const app = express();

// use helmet to increase http header security
app.use(helmet());

// initialize cloudinary
initializeCloudinary();

// applying the middleware for parsing request bodies
app.use(require('body-parser').json());

// to avoid cross origin error. remove in production
app.use(cors());

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

module.exports = app;
