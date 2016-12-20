var parseArgs = require('minimist');
var webpackConfig = require('./webpack.config');

var args = parseArgs(process.argv.slice(2), {
  string: ['env'],
  default: {
    'env': 'mocha'
  }
});

webpackConfig.module.postLoaders = [
  {
    test: /\.ts$/,
    loader: 'istanbul-instrumenter-loader',
    exclude: [
      'node_modules',
      /\.spec\.ts$/
    ]
  }
];

var reporters = ['mocha', 'coverage'];
var browsers = ['PhantomJS'];

if (args.env === 'tc') {
  reporters = ['teamcity', 'coverage'];
}

if (args.env === 'jk') {
  reporters = ['junit', 'coverage'];
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'source-map-support'],
    files: [
      'node_modules/es6-promise/dist/es6-promise.auto.js',
      'src/test.ts'
    ],
    reporters: reporters,
    preprocessors: {
      'src/test.ts': ['webpack']
    },
    webpack: {
      devtool: 'inline-source-map',
      resolve: webpackConfig.resolve,
      module: webpackConfig.module,
      ts: {
        compilerOptions: {
          inlineSourceMap: true,
          sourceMap: false
        }
      }
    },
    webpackServer: {noInfo: true},
    junitReporter: {
      outputDir: 'reports/'
    },
    coverageReporter: {
      reporters: [{
        type: 'json',
        dir: 'coverage/json',
        subdir: '.'
      }]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: browsers,
    singleRun: true
  });
};
