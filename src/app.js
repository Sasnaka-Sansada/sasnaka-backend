const express = require('express');
const configurations = require('./config');
const routes = require('./routes');

const app = express();

// applying the middleware for parsing request bodies
app.use(require('body-parser').json());

// routing
routes.endPointsHandler(app);

// listening to the server port
app.listen(configurations.port, () => {
  console.log('Example app listening on port 8000!');
});
