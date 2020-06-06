const { Roles } = require('./role');

module.exports = (sequelize, Sequelize) => {
  const Invitation = sequelize.define('Invitation', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    email: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING(96),
      unique: true,
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
  }, {});

  // eslint-disable-next-line no-unused-vars
  Invitation.associate = (models) => {
  };
  return Invitation;
};