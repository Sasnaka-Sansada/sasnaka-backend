
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'User',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(1023),
        unique: true,
        allowNull: false,
        isEmail: true,
      },
      password: {
        type: Sequelize.STRING(1023),
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    },
  ),

  down: (queryInterface) => queryInterface.dropTable('User'),

};
