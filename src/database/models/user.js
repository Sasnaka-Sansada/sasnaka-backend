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
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    roleId: {
      type: Sequelize.ENUM(Roles),
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
  User.associate = (models) => {
  };
  return User;
};
