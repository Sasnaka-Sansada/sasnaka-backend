const registrarRoutes = require('./registrar');
const authRoutes = require('./authenticate');
const projectRoutes = require('./project');
const cordinatorRoutes = require('./cordinator');
const teamMemberRoutes = require('./team_member');
const notificationRoutes = require('./notification');
const eventRoutes = require('./event');
const volunteerRoutes = require('./volunteer');
const feedbackRoutes = require('./feedback');
const sponsorRoutes = require('./sponsor');
const resourcePersonRoutes = require('./resource_person');

// routes dividing into subroutes
const endPointsHandler = (app) => {
  app.use('/api/registrar', registrarRoutes);
  app.use('/api/authenticate', authRoutes);
  app.use('/api/project', projectRoutes);
  app.use('/api/cordinator', cordinatorRoutes);
  app.use('/api/team', teamMemberRoutes);
  app.use('/api/notification', notificationRoutes);
  app.use('/api/event', eventRoutes);
  app.use('/api/volunteer', volunteerRoutes);
  app.use('/api/feedback', feedbackRoutes);
  app.use('/api/sponsor', sponsorRoutes);
  app.use('/api/resource', resourcePersonRoutes);
};

module.exports = { endPointsHandler };
