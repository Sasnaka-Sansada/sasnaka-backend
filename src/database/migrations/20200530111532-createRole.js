
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'Role',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(96),
        unique: true,
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

  down: (queryInterface) => queryInterface.dropTable('Role'),

};
