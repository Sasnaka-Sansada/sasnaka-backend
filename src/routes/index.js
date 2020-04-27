const loginRoutes = require('./login');

// routes dividing into subroutes
const endPointsHandler = (app) => {
  app.use('/api/login', loginRoutes);
};

module.exports = { endPointsHandler };
