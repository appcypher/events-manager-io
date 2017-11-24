'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('EventCenters', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      picture1: {
        type: Sequelize.BLOB
      },
      picture2: {
        type: Sequelize.BLOB
      },
      picture3: {
        type: Sequelize.BLOB
      },
      picture4: {
        type: Sequelize.BLOB
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('EventCenters');
  }
};