module.exports = (sequelize, Sequelize) => {
  const UpcomingEvent = sequelize.define('UpcomingEvent', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    headerTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    headerSinhalaTitle: {
      type: Sequelize.STRING,
    },
    headerDescription: {
      type: Sequelize.TEXT,
    },
    contentImage: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    contentDescription: {
      type: Sequelize.TEXT,
    },
    thumbnailImage: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    thumbnailDescription: {
      type: Sequelize.TEXT,
    },
    thumbnailTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    heroImage: {
      type: Sequelize.STRING(1023),
      allowNull: true,
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
  UpcomingEvent.associate = (models) => {
    models.UpcomingEvent.hasMany(models.UpcomingEventImage, { onDelete: 'cascade', hooks: true, foreignKey: 'eventId' });
  };
  return UpcomingEvent;
};
