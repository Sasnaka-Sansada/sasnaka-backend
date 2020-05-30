const express = require('express');
const configurations = require('./config');
const routes = require('./routes');

const { ErrorHandlerMiddleware } = require('./loaders/error_handler');

const app = express();

// applying the middleware for parsing request bodies
app.use(require('body-parser').json());

// routing
routes.endPointsHandler(app);

// error handler middleware
app.use(ErrorHandlerMiddleware);

// listening to the server port
app.listen(configurations.port, () => {
  console.log('Sasnaka backend up and running');
});
