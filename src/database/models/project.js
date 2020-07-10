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
    subHeader: Sequelize.STRING,
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
    pillerId: {
      type: Sequelize.ENUM(Pillers),

    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  // eslint-disable-next-line no-unused-vars
  Project.associate = (models) => {
  };
  return Project;
};
