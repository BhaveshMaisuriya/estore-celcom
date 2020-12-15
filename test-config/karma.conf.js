var webpackConfig = require('./webpack.test.js');

module.exports = function (config) {
  var _config = {
    basePath: '../',

    frameworks: ['jasmine'],
    /*plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],*/
    client: {
      clearContext: true // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      {
        pattern: './test-config/karma-test-shim.js',
        watched: true
      },
      {
        pattern: './src/assets/**/*',
        watched: false,
        included: false,
        served: true,
        nocache: false
      }//,

      //'./**/*spec.ts'
    ],

    proxies: {
      '/assets/': '/base/src/assets/'
    },

    preprocessors: {
      /*'./src/test.ts': ['@angular-devkit/build-angular'],*/
      './test-config/karma-test-shim.js': ['webpack', 'sourcemap']

    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },

    coverageReporter: {
      // specify a common output directory
      dir: '.',
      reporters: [
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' }
      ]
    },
    /*coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },*/

    reporters: config.coverage ? ['kjhtml', 'dots', 'coverage-istanbul'] : ['kjhtml', 'dots'],
    /*reporters: config.angularCli && config.angularCli.codeCoverage
          ? ['progress', 'coverage-istanbul']
          : ['progress', 'kjhtml'],*/
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: ['--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--remote-debugging-port=9222'],
      }
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  };

  config.set(_config);
};