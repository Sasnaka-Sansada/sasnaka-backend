const loginRoutes = require('./login');
const registrarRoutes = require('./registrar');

// routes dividing into subroutes
const endPointsHandler = (app) => {
  app.use('/api/login', loginRoutes);
  app.use('/api/registrar', registrarRoutes);
};

module.exports = { endPointsHandler };
