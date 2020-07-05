const registrarRoutes = require('./registrar');
const authRoutes = require('./authenticate');
const projectRoutes = require('./project');
const cordinatorRoutes = require('./cordinator');
const teamMemberRoutes = require('./team_member');

// routes dividing into subroutes
const endPointsHandler = (app) => {
  app.use('/api/registrar', registrarRoutes);
  app.use('/api/authenticate', authRoutes);
  app.use('/api/project', projectRoutes);
  app.use('/api/cordinator', cordinatorRoutes);
  app.use('/api/team', teamMemberRoutes);
};

module.exports = { endPointsHandler };
