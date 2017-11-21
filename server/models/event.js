export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    Event.belongsTo(models.User);
    Event.belongsTo(models.EventCenter);
  };

  return Event;
};
