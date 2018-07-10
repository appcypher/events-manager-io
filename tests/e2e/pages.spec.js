import SignIn from './signin.spec';

export default {
  'View All Pages': (client) => {
    // Sign in as regular user first.
    SignIn['Regular Login'](client);

    client
      .click('#goto-home')
      .pause(2000)
      .click('#goto-discover')
      .pause(2000)
      .click('#goto-profile')
      .pause(2000);
  },
};
