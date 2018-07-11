export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: { args: /^[A-Za-z_](\w|_|[0-9.])*$/, msg: 'Invalid name: make sure it is at least 2 characters!' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [5, 100], msg: 'Password is too short!' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { args: true, msg: 'Invalid email!' },
      },
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: { args: /^[^\\+;/'"@~!#$%^&*()[\]=?]+$/, msg: 'Invalid name: Make sure it doesn\'t contain punctuations!' },
      },
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    tagline: {
      type: DataTypes.STRING,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Event, { as: 'events', foreignKey: 'userId' });
    User.hasMany(models.EventCenter, { as: 'centers', foreignKey: 'userId' });
  };

  return User;
};
