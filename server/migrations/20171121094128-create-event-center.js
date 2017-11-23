module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('EventCenters', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      picture1: {
        type: Sequelize.BLOB,
      },
      picture2: {
        type: Sequelize.BLOB,
      },
      picture3: {
        type: Sequelize.BLOB,
      },
      picture4: {
        type: Sequelize.BLOB,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: queryInterface => queryInterface.dropTable('EventCenters'),
};
