var webpack = require('webpack'),
    webpackConfig = require('./webpack.config.base');

webpackConfig.module.rules = [{
    test: /\.ts$/,
    exclude: /node_modules/,
    loader: 'awesome-typescript-loader',
    query: {
      compilerOptions: {
        inlineSourceMap: true,
        sourceMap: false
      }
    }
  },
  {
    test: /\.html$/,
    loader: 'raw-loader',
    exclude: ['./src/index.html']
  }
];

webpackConfig.plugins = [
    new webpack.SourceMapDevToolPlugin({
        filename: null, // if no value is provided the sourcemap is inlined
        test: /\.(ts|js)($|\?)/i
    })
];

webpackConfig.devtool = 'inline-source-map';

module.exports = webpackConfig;
