module.exports = (sequelize, Sequelize) => {
  const Volunteer = sequelize.define('Volunteer', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birthday: {
      type: Sequelize.DATE,
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
    potentials: Sequelize.TEXT,
    interested: Sequelize.TEXT,
    comment: Sequelize.TEXT,
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  // eslint-disable-next-line no-unused-vars
  Volunteer.associate = (models) => {
  };
  return Volunteer;
};
