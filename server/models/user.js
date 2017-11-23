export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
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
    User.hasMany(models.Event, { foreignKey: 'user' });
  };

  // Use hook to save hashed password later
  /* eslint-disable no-param-reassign */
  // User.hook('beforeValidate', (user) => {
  //   const hash = bcrypt.hashSync(user.password, 10);
  //   user.password = hash;
  // });
  /* eslint-disable no-param-reassign */

  return User;
};
