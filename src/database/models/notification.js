module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define('Notification', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    header: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    subHeader: Sequelize.STRING,
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    subDescription: Sequelize.TEXT,
    bannerImage: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    portraitImage: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
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
  Notification.associate = (models) => {
    models.Notification.hasMany(models.Attatchment, {
      onDelete: 'cascade', hooks: true, foreignKey: 'notificationId',
    });
  };
  return Notification;
};
