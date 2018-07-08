export default {
  'Login test': (client) => {
    client
      .url('localhost:3000/signin')
      .setValue('input[name="username"]', 'admin')
      .setValue('input[name="password"]', 'admin')
      .click('#login-button')
      .assert.containsText('main', 'News feed')
      .end();
  },
};
