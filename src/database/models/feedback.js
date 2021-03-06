module.exports = (sequelize, Sequelize) => {
  const Feedback = sequelize.define('Feedback', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    visible: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    date: {
      type: Sequelize.DATE,
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
  Feedback.associate = (models) => {
  };
  return Feedback;
};
