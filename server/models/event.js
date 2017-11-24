export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { args: true, msg: 'date format is invalid!\nmake sure it is in YYYY-MM-DD format' },
        isAfter: { args: '2017-11-24', msg: 'date format is invalid!\nmake sure it is within a month\'s range' },
        isBefore: { args: '2017-12-24', msg: 'date format is invalid!\nmake sure it is within a month\'s range' },
      },
    },
    center: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'EventCenters',
        key: 'id',
      },
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

  Event.associate = (models) => {
    Event.belongsTo(models.User, { foreignKey: 'user' });
    Event.belongsTo(models.EventCenter, { foreignKey: 'center' });
  };

  return Event;
};
