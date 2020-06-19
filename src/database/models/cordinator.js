module.exports = (sequelize, Sequelize) => {
  const Cordinator = sequelize.define('Cordinator', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    university: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    alumni: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    profileImage: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  }, { paranoid: true });

  // eslint-disable-next-line no-unused-vars
  Cordinator.associate = (models) => {
    models.Cordinator.belongsTo(models.Project);
  };
  return Cordinator;
};
