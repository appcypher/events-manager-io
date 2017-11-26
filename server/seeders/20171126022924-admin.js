const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [{
      username: 'admin',
      password: bcrypt.hashSync('admin', 10),
      email: 'admin@gmail.com',
      fullname: 'admin',
      admin: true,
      picture: null,
      description: null,
      tagline: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {}),

  down: (queryInterface) => {
    queryInterface.bulkDelete('Users', [{
      username: 'admin',
    }]);
  },
};
