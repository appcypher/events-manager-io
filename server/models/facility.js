export default (sequelize, DataTypes) => {
  const Facility = sequelize.define('Facility', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    projector: {
      type: DataTypes.BOOLEAN,
      validate: {
        isBoolean: { args: true, msg: 'projector format is invalid! - make sure value is either true or false!' },
      },
    },
    chairs: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { args: true, msg: 'chairs format is invalid! - make sure value is an integer' },
      },
    },
    tables: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { args: true, msg: 'tables format is invalid! - make sure value is an integer' },
      },
    },
    parkinglot: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { args: true, msg: 'parkinglot format is invalid! - make sure value is an integer' },
      },
    },
    restrooms: {
      type: DataTypes.BOOLEAN,
      validate: {
        isBoolean: { args: true, msg: 'restrooms format is invalid! - make sure value is either true or false!' },
      },
    },
    telescreens: {
      type: DataTypes.BOOLEAN,
      validate: {
        isBoolean: { args: true, msg: 'telescreens format is invalid! - make sure value is either true or false!' },
      },
    },
    lighting: {
      type: DataTypes.BOOLEAN,
      validate: {
        isBoolean: { args: true, msg: 'lighting format is invalid! - make sure value is either true or false!' },
      },
    },
    sounds: {
      type: DataTypes.BOOLEAN,
      validate: {
        isBoolean: { args: true, msg: 'sounds format is invalid! - make sure value is either true or false!' },
      },
    },
    stage: {
      type: DataTypes.BOOLEAN,
      validate: {
        isBoolean: { args: true, msg: 'stage format is invalid! - make sure value is either true or false!' },
      },
    },
    centerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'EventCenters',
        key: 'id',
      },
    },
  });

  Facility.associate = (models) => {
    Facility.belongsTo(models.EventCenter, { foreignKey: 'centerId' });
  };

  return Facility;
};

