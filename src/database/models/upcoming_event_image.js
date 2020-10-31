module.exports = (sequelize, Sequelize) => {
  const UpcomingEventImage = sequelize.define('UpcomingEventImage', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    eventId: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    image: {
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
  UpcomingEventImage.associate = (models) => {
  };
  return UpcomingEventImage;
};
