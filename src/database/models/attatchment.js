module.exports = (sequelize, Sequelize) => {
  const Attatchment = sequelize.define('Attatchment', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    notificationId: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    attatchment: {
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
  Attatchment.associate = (models) => {
  };
  return Attatchment;
};
