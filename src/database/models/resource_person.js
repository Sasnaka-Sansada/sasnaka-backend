module.exports = (sequelize, Sequelize) => {
  const ResourcePerson = sequelize.define('ResourcePerson', {
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
    contactNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    help: Sequelize.TEXT,
    address: Sequelize.TEXT,
    comment: Sequelize.TEXT,
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
  ResourcePerson.associate = (models) => {
  };
  return ResourcePerson;
};
