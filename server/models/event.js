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
        isDate: { args: true, msg: 'date format is invalid! - make sure it is in YYYY-MM-DD format' },
        isAfter: { args: '2017-11-24', msg: 'date format is invalid! - make sure it is within a month\'s range' },
        isBefore: { args: '2017-12-24', msg: 'date format is invalid! - make sure it is within a month\'s range' },
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  });

  Event.associate = (models) => {
    Event.belongsTo(models.User, { foreignKey: 'userId' });
    Event.belongsTo(models.EventCenter, { foreignKey: 'centerId' });
  };

  return Event;
};
