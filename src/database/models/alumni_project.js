// eslint-disable-next-line no-unused-vars
module.exports = (sequelize, Sequelize) => {
  const AlumniProject = sequelize.define('AlumniProject', {}, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });

  AlumniProject.associate = (models) => {
    models.Project.belongsToMany(models.Cordinator, { through: models.AlumniProject, foreignKey: 'pastProjectId', as: 'alumniProjects' });
    models.Cordinator.belongsToMany(models.Project, { through: models.AlumniProject, foreignKey: 'cordinatorId', as: 'alumniProjects' });
  };
  return AlumniProject;
};
