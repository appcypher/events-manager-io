export default {
  'User Signup': (client) => {
    const name = `user${Math.random()}`;
    client
      .url('localhost:3000/signup')
      .waitForElementVisible('body', 2000)
      .setValue('input[name="email"]', `${name}@mail.com`)
      .pause(500)
      .setValue('input[name="username"]', name)
      .pause(500)
      .setValue('input[name="fullname"]', name)
      .pause(500)
      .setValue('input[name="password"]', name)
      .pause(1000)
      .click('#signup-button')
      .waitForElementVisible('#discover-page', 2000)
      .pause(3000);
  },
};
