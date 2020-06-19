const registrarRoutes = require('./registrar');
const authRoutes = require('./authenticate');
const projectRoutes = require('./project');
const cordinatorRoutes = require('./cordinator');

// routes dividing into subroutes
const endPointsHandler = (app) => {
  app.use('/api/registrar', registrarRoutes);
  app.use('/api/authenticate', authRoutes);
  app.use('/api/project', projectRoutes);
  app.use('/api/cordinator', cordinatorRoutes);
};

module.exports = { endPointsHandler };
