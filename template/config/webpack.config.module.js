const
  webpackConfig = require('./webpack.config.prod'),
  helpers = require('./helpers');

webpackConfig.output = {
  path: helpers.root('/dist'),
  filename: 'index.js',
  library: '[name]',
  libraryTarget: 'umd',
  umdNamedDefine: true
};

webpackConfig.externals = {
  'axios': 'axios',
  'vue': 'vue',
  'vue-class-component': 'vue-class-component',
  'vue-property-decorator': 'vue-property-decorator',
  'vue-router': 'vue-router'
};

module.exports = webpackConfig;
