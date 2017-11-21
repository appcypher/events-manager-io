export default (sequelize, DataTypes) => {
  const Facility = sequelize.define('Facility', {
    projector: {
      type: DataTypes.BOOLEAN,
    },
    chairs: {
      type: DataTypes.INTEGER,
    },
    tables: {
      type: DataTypes.INTEGER,
    },
    parkinglot: {
      type: DataTypes.INTEGER,
    },
    restrooms: {
      type: DataTypes.BOOLEAN,
    },
    telescreens: {
      type: DataTypes.BOOLEAN,
    },
    lighting: {
      type: DataTypes.BOOLEAN,
    },
    sounds: {
      type: DataTypes.BOOLEAN,
    },
    stage: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Facility.belongsTo(models.EventCenter, {
          foreignKey: 'center',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return Facility;
};
