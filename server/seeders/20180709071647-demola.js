const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Load dotenv config files
dotenv.config();

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [{
      username: 'demola',
      password: bcrypt.hashSync('demola', 10),
      email: 'demola@gmail.com',
      fullname: 'Demola Ariya',
      admin: false,
      picture: 'https://avatars1.githubusercontent.com/u/25783086?s=400&v=4',
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
