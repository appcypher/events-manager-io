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
    User.hasMany(models.Event, { as: 'events', foreignKey: 'user' });
    User.hasMany(models.EventCenter, { as: 'centers', foreignKey: 'user' });
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
