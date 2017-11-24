'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var EventCenter = sequelize.define('EventCenter', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      validate: {
        isInt: {
          msg: 'EventCenter id must be an integer'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picture1: {
      type: DataTypes.BLOB
    },
    picture2: {
      type: DataTypes.BLOB
    },
    picture3: {
      type: DataTypes.BLOB
    },
    picture4: {
      type: DataTypes.BLOB
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

  EventCenter.associate = function (models) {
    EventCenter.hasMany(models.Event, { as: 'events', foreignKey: 'center' });
    EventCenter.belongsTo(models.Event, { foreignKey: 'user' });
  };

  return EventCenter;
};