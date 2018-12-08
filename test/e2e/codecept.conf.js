const config = {
  'tests': './*.test.js',
  'timeout': 10000,
  'output': './output',
  'helpers': {
    'Puppeteer' : {
      'url': 'http://localhost:1234',
      'waitForNavigation': 'networkidle0',
      'waitForAction': 500,
      'show': 'true',
      'chrome': {
        'headless': false,
        'ignoreHTTPSErrors': true
      }
    },
    'PuppeteerHelper': {
      'require': './helpers/puppeteer-helper.js'
    }
  },
  'bootstrap': false,
  'mocha': {},
  'name': 'test'
};

exports.config = config;