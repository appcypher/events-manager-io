require('babel-core/register')();

module.exports = {
  src_folders: ['./tests/e2e'],

  exclude: ['./tests/e2e/utils'],

  selenium: {
    start_process: true,
    server_path: './bin/selenium-server-standalone-3.9.1.jar',
    log_path: '',
    port: 4445,
    cli_args: {
      'webdriver.chrome.driver': './bin/chromedriver',
    },

  },

  test_settings: {
    default: {
      launch_url: 'http://localhost:3000',
      selenium_port: 4445,
      selenium_host: '127.0.0.1',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },
  },
};
