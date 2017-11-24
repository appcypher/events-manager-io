'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Facility = sequelize.define('Facility', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    projector: {
      type: DataTypes.BOOLEAN
    },
    chairs: {
      type: DataTypes.INTEGER
    },
    tables: {
      type: DataTypes.INTEGER
    },
    parkinglot: {
      type: DataTypes.INTEGER
    },
    restrooms: {
      type: DataTypes.BOOLEAN
    },
    telescreens: {
      type: DataTypes.BOOLEAN
    },
    lighting: {
      type: DataTypes.BOOLEAN
    },
    sounds: {
      type: DataTypes.BOOLEAN
    },
    stage: {
      type: DataTypes.BOOLEAN
    },
    center: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'EventCenters',
        key: 'id'
      }
    }
  });

  Facility.associate = function (models) {
    Facility.belongsTo(models.EventCenter, { foreignKey: 'center' });
  };

  return Facility;
};