module.exports = (sequelize, Sequelize) => {
  const Banner = sequelize.define('Banner', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    header: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    heroImage: {
      type: Sequelize.STRING(1023),
    },
    readMoreLink: {
      type: Sequelize.STRING(1023),
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
  Banner.associate = (models) => {
  };
  return Banner;
};
