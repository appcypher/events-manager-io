module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Facilities', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      projector: {
        type: Sequelize.BOOLEAN,
      },
      chairs: {
        type: Sequelize.INTEGER,
      },
      tables: {
        type: Sequelize.INTEGER,
      },
      parkinglot: {
        type: Sequelize.INTEGER,
      },
      restrooms: {
        type: Sequelize.BOOLEAN,
      },
      telescreens: {
        type: Sequelize.BOOLEAN,
      },
      lighting: {
        type: Sequelize.BOOLEAN,
      },
      sounds: {
        type: Sequelize.BOOLEAN,
      },
      stage: {
        type: Sequelize.BOOLEAN,
      },
      center: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'EventCenters',
          key: 'id',
        },
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
  down: queryInterface => queryInterface.dropTable('Facilities'),
};
