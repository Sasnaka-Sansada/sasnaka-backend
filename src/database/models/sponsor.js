module.exports = (sequelize, Sequelize) => {
  const Sponsor = sequelize.define('Sponsor', {
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
    address: Sequelize.TEXT,
    comment: Sequelize.TEXT,
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  // eslint-disable-next-line no-unused-vars
  Sponsor.associate = (models) => {
  };
  return Sponsor;
};
