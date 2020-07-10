
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'Invitation',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(1023),
        unique: true,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING(96),
        unique: false,
        allowNull: false,
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Role', key: 'id' },
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    },
  ),

  down: (queryInterface) => queryInterface.dropTable('Invitation'),

};
