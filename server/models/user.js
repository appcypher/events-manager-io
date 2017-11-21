export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    picture: {
      type: DataTypes.BLOB,
    },
    description: {
      type: DataTypes.STRING,
    },
    tagline: {
      type: DataTypes.STRING,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Events, { foreignKey: 'user' });
  };

  return User;
};
