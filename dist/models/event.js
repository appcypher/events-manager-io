'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    center: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'EventCenters',
        key: 'id'
      }
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  });

  Event.associate = function (models) {
    Event.belongsTo(models.User, { foreignKey: 'user' });
    Event.belongsTo(models.EventCenter, { foreignKey: 'center' });
  };

  return Event;
};