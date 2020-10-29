module.exports = (sequelize, Sequelize) => {
  const Cordinator = sequelize.define('MediaCordinator', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
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
      defaultValue: true,
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
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });

  // eslint-disable-next-line no-unused-vars
  Cordinator.associate = (models) => {
  };
  return Cordinator;
};
