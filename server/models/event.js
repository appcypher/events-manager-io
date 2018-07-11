import moment from 'moment';

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
        isDate: { args: true, msg: 'Invalid date: Make sure it is in YYYY-MM-DD format!' },
        isAfter: { args: moment().add(1, 'day').toISOString(), msg: 'Invalid date: Make sure it is not less than a day from now!' },
        isBefore: { args: moment().add(30, 'day').toISOString(), msg: 'Invalid date: Make sure it is not more than a month from now!' },
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
    Event.belongsTo(models.EventCenter, { as: 'center', foreignKey: 'centerId' });
  };

  return Event;
};
