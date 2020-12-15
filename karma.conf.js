process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-coverage'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        random: false
      },
      captureConsole: false
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      dir: require('path').join(__dirname, 'coverage'), reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    captureTimeout: 990000000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 990000000,
    browserNoActivityTimeout: 990000000,
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    //browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
            '--headless',
            '--disable-gpu',
            '--no-sandbox',
            '--remote-debugging-port=9222',
        ]
      }
    },
    browsers: ['ChromeHeadless'],
    singleRun: false,
  });
};
