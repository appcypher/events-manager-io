export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
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
    center: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'EventCenters',
        key: 'id',
      },
    },
    user: {
      type: DataTypes.UUID,
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
