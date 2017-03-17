var path = require('path');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var metadata = {
  title: 'vue-typescript ts sample',
  host: 'localhost',
  port: 8080,
  ENV: ENV
};

module.exports = {
  stats: false,
  devtool: 'source-map', //to point console errors to ts files instead of compiled js
  entry: {
    'main': './src/main.ts', //app main file
    'main.min': './src/main.ts' //app main file
  },
  output: {
    path: root('dist/js'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.html'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [
      { test: /\.ts$/, exclude: /node_modules/, enforce: 'pre', loader: 'tslint-loader' },
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /\.html$/, loader: 'raw-loader', exclude: [ './src/index.html' ] }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/assets', to: '../assets' },
      { from: 'src/css', to: '../css' }
    ]),
    new DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV)
      }
    }),
    new UglifyJsPlugin({
      include: /\.min\.js$/, minimize: true
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      test: /\.min\.js$/
    })
  ],
  devServer: {
    port: metadata.port,
    host: metadata.host,
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    contentBase: './src',
    open: true
  }
};

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
