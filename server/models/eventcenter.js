export default (sequelize, DataTypes) => {
  const EventCenter = sequelize.define('EventCenter', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isDecimal: { args: true, msg: 'Invalid price: Make sure value is a number!' },
        min: { args: 1000, msg: 'Invalid price: Make sure the value is not less than 1000!' },
        max: { args: 10000000, msg: 'Invalid price: Make sure the value is not more than 10,000,000!' },
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    picture1: {
      type: DataTypes.STRING,
    },
    picture2: {
      type: DataTypes.STRING,
    },
    picture3: {
      type: DataTypes.STRING,
    },
    picture4: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  });

  EventCenter.associate = (models) => {
    EventCenter.hasMany(models.Event, { as: 'events', foreignKey: 'centerId' });
    EventCenter.hasOne(models.Facility, { as: 'facility', foreignKey: 'centerId' });
    EventCenter.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return EventCenter;
};
