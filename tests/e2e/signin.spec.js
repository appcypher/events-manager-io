import dotenv from 'dotenv';

// Load dotenv config files
dotenv.config();

export default {
  'Regular Login': (client) => {
    client
      .url('localhost:3000/signin')
      .waitForElementVisible('body', 2000)
      .setValue('input[name="username"]', 'demola')
      .pause(500)
      .setValue('input[name="password"]', 'demola')
      .pause(1000)
      .click('#login-button')
      .waitForElementVisible('#discover-page', 2000)
      .pause(3000);
  },

  'Admin Login': (client) => {
    const adminPassword = process.env.ADMIN_SEED_PASSWORD;
    client
      .url('localhost:3000/signin')
      .waitForElementVisible('body', 2000)
      .setValue('input[name="username"]', 'admin')
      .pause(500)
      .setValue('input[name="password"]', adminPassword)
      .pause(1000)
      .click('#login-button')
      .waitForElementVisible('#discover-page', 2000)
      .pause(3000);
  },
};
