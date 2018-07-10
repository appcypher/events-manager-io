import SignIn from './signin.spec';

export default {
  'View Center': (client) => {
    client
      .url('localhost:3000/discover')
      .waitForElementVisible('body', 2000)
      .click('.io-center-card')
      .pause(2000)
      .click('#view-center-ok')
      .pause(2000);
  },

  'Create Center': (client) => {
    const id = Math.ceil(Math.random() * 100);

    // Sign in as admin first.
    SignIn['Admin Login'](client);
    client
      .click('#main-fab')
      .pause(500)
      .waitForElementVisible('#fab-group', 1000)
      .click('#fab-2')
      .pause(500)
      .waitForElementVisible('#add-center-modal', 1000)
      .setValue('#add-center-name', `Test-${id}`)
      .pause(500)
      .setValue('#add-center-description', `Test-${id}`)
      .pause(500)
      .setValue('#add-center-type', `Test-${id}`)
      .pause(500)
      .setValue('#add-center-location', `Test-${id}`)
      .pause(500)
      .setValue('#add-center-price', 50000)
      .pause(500)
      .click('#add-center-submit')
      .waitForElementVisible('#discover-page', 2000)
      .pause(4000);
  },

  'Modify Center': (client) => {
    const id = Math.ceil(Math.random() * 100);
    client
      .click('.io-cards-container.centers :nth-child(2) .io-center-card')
      .pause(500)
      .waitForElementVisible('#view-center-modal', 1000)
      .click('#modify-center')
      .pause(500)
      .waitForElementVisible('#modify-center-modal', 1000)
      .clearValue('#modify-center-name')
      .setValue('#modify-center-name', `Test-${id}`)
      .pause(500)
      .clearValue('#modify-center-description')
      .setValue('#modify-center-description', `Test-${id}`)
      .pause(500)
      .clearValue('#modify-center-type')
      .setValue('#modify-center-type', `Test-${id}`)
      .pause(500)
      .clearValue('#modify-center-location')
      .setValue('#modify-center-location', `Test-${id}`)
      .pause(500)
      .clearValue('#modify-center-price')
      .setValue('#modify-center-price', 20000)
      .pause(500)
      .click('#modify-center-submit')
      .waitForElementVisible('#discover-page', 2000)
      .pause(3000);
  },
};
