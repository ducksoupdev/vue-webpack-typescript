var webpackConfig = require('./config/webpack.config.base');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      'node_modules/es6-promise/dist/es6-promise.auto.js',
      'src/test.ts'
    ],
    preprocessors: {
      'src/test.ts': ['webpack']
    },
    webpack: {
      resolve: webpackConfig.resolve,
      module: webpackConfig.module
    },
    webpackServer: { noInfo: true },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
