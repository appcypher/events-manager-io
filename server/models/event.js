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
  }, {
    classMethods: {
      associate: (models) => {
        Event.belongsTo(models.User, {
          foreignKey: 'user',
          onDelete: 'CASCADE',
        });

        Event.belongsTo(models.EventCenter, {
          foreignKey: 'center',
        });
      },
    },
  });
  return Event;
};
