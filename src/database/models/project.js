const { Pillers } = require('./pillar');

module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define('Project', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    header: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    subHeader: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    translatedHeader: {
      type: Sequelize.STRING,
    },
    introduction: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    objective: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    process: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    thumbnailDescription: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    introductionImage: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    objectiveImage: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    processImage: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    thumbnailImage: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    heroImage: {
      type: Sequelize.STRING(1023),
      allowNull: true,
    },
    pillerId: {
      type: Sequelize.ENUM(Pillers),
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });

  // eslint-disable-next-line no-unused-vars
  Project.associate = (models) => {
    models.Project.hasMany(models.Cordinator, {
      onDelete: 'cascade', hooks: true, foreignKey: 'projectId', as: 'cordinator',
    });
    models.Project.hasMany(models.Event, { onDelete: 'cascade', hooks: true, foreignKey: 'projectId' });
  };
  return Project;
};
