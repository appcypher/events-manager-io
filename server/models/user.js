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
        is: { args: /^[A-Za-z_](\w|_|[0-9])*$/, msg: 'username format is invalid! - make sure it is at least 2 characters' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [5, 100], msg: 'password is too short! - make sure it is at least 5 characters' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { args: true, msg: 'email format is invalid!' },
      },
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: { args: /^[^\\+;./'"@~!#$%^&*()[\]=?]+$/, msg: 'fullname format is invalid! - make sure it doesn\'t contain punctuations' },
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
