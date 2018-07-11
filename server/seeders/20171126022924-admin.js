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
      fullname: 'Steve Akinyemi',
      admin: true,
      picture: 'https://avatars0.githubusercontent.com/u/20358651?s=400&u=2f27bb68d4f74a1564df0be631a47619b44b64cb&v=4',
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
