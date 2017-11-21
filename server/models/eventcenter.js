export default (sequelize, DataTypes) => {
  const EventCenter = sequelize.define('EventCenter', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture1: {
      type: DataTypes.BLOB,
    },
    picture2: {
      type: DataTypes.BLOB,
    },
    picture3: {
      type: DataTypes.BLOB,
    },
    picture4: {
      type: DataTypes.BLOB,
    },
  });

  EventCenter.associate = (models) => {
    EventCenter.hasMany(models.Event, { foreignKey: 'center' });
  };

  return EventCenter;
};
