const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Load dotenv config files
dotenv.config();

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [{
      username: 'admin',
      password: bcrypt.hashSync(process.env.ADMIN_SEED_PASSWORD, 10),
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
