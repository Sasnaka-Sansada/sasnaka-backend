const app = require('./server');
const configurations = require('./config');
const logger = require('./helpers/logger');


// listening to the server port
app.listen(configurations.port, () => {
  logger.info('Sasnaka backend up and running');
});

// 404 error handler
app.use((req, res) => {
  res.status(404).send({ message: '404 route not found' });
});
