import moment from 'moment';
import SignIn from './signin.spec';

export default {
  'Create Event': (client) => {
    const id = Math.ceil(Math.random() * 100);
    const days = Math.ceil(Math.random() * 30);
    const isoDate = moment().add(days, 'day').toISOString();
    const date = `${isoDate.slice(8, 10)}-07-2018`;
    const time = '5:00PM';

    const dropdownSelection = Math.ceil(Math.random() * 2);

    // Sign in as regular user first.
    SignIn['Regular Login'](client);

    client
      .click('#goto-profile')
      .pause(500)
      .waitForElementVisible('#profile-page', 5000)
      .click('.io-fab')
      .pause(500)
      .waitForElementVisible('#fab-group', 1000)
      .click('#fab-1')
      .pause(500)
      .waitForElementVisible('#add-event-modal', 1000)
      .setValue('#add-event-title', `Test-${id}`)
      .pause(500)
      .setValue('#add-event-description', `Test-${id}`)
      .pause(500)
      .setValue('#add-event-center', 'M')
      .pause(500)
      .click(`.io-dropdown :nth-child(${dropdownSelection})`)
      .pause(500)
      .clearValue('#add-event-date')
      .setValue('#add-event-date', date)
      .pause(500)
      .clearValue('#add-event-time')
      .setValue('#add-event-time', time)
      .pause(500)
      .click('#add-event-submit')
      .pause(5000);
  },

  'Modify Event': (client) => {
    const id = Math.ceil(Math.random() * 100);
    const dropdownSelection = Math.ceil(Math.random() * 2);
    client
      .click('.io-event-card .io-edit')
      .pause(500)
      .waitForElementVisible('#modify-event-modal', 1000)
      .clearValue('#modify-event-title')
      .setValue('#modify-event-title', `Test-${id}`)
      .pause(500)
      .clearValue('#modify-event-description')
      .setValue('#modify-event-description', `Test-${id}`)
      .pause(500)
      .clearValue('#modify-event-center')
      .setValue('#modify-event-center', 'Test')
      .pause(500)
      .click(`.io-dropdown :nth-child(${dropdownSelection})`)
      .pause(500)
      .click('#modify-event-submit')
      .pause(5000);
  },

  'Delete Event': (client) => {
    client
      .click('.io-event-card .io-delete')
      .pause(500)
      .waitForElementVisible('#confirm-modal', 1000)
      .pause(500)
      .click('#confirm-ok')
      .pause(5000);
  },
};
