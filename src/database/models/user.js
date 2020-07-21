const { Roles } = require('./role');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    email: {
      type: Sequelize.STRING(1023),
      allowNull: false,
      isEmail: true,
    },
    password: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    roleId: {
      type: Sequelize.ENUM(Roles),
      allowNull: false,
    },
    sponsorEmail: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    resourcePersonEmail: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    profileImage: {
      type: Sequelize.STRING(1023),
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
  };
  return User;
};
