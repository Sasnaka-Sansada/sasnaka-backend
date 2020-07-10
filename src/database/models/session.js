module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define('Session', {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    userId: Sequelize.UUID,
    expires: Sequelize.DATE,
    data: Sequelize.STRING(50000),
  }, {});

  Session.associate = (models) => {
    Session.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Session;
};
