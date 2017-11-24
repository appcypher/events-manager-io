export default (sequelize, DataTypes) => {
  const EventCenter = sequelize.define('EventCenter', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      validate: {
        isInt: {
          msg: 'EventCenter id must be an integer',
        },
      },
    },
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
      validate: {
        isDecimal: { args: true, msg: 'price format is invalid! - make sure value is a number' },
        min: { args: 1000, msg: 'price format is invalid! - make sure the value is not less than 1000' },
        max: { args: 10000000, msg: 'price format is invalid! - make sure the value is not more than 10,000,000' },
      },
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
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  });

  EventCenter.associate = (models) => {
    EventCenter.hasMany(models.Event, { as: 'events', foreignKey: 'center' });
    EventCenter.belongsTo(models.Event, { foreignKey: 'user' });
  };

  return EventCenter;
};
