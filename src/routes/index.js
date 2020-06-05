const registrarRoutes = require('./registrar');
const authRoutes = require('./authenticate');

// routes dividing into subroutes
const endPointsHandler = (app) => {
  app.use('/api/registrar', registrarRoutes);
  app.use('/api/authenticate', authRoutes);
};

module.exports = { endPointsHandler };
