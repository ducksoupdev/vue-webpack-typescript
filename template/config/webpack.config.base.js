const helpers = require("./helpers"),
  DefinePlugin = require('webpack/lib/DefinePlugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
  entry: {
    "main": helpers.root("/src/main.ts")
  },
  output: {
    path: helpers.root("/dist/js"),
    filename: "[name].js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".html"],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [
      {test: /\.ts$/, exclude: /node_modules/, enforce: 'pre', loader: 'tslint-loader'},
      {test: /\.ts$/, exclude: /node_modules/, loader: "awesome-typescript-loader"},
      {test: /\.html$/, loader: 'raw-loader', exclude: ['./src/index.html']}
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: 'src/assets', to: '../assets'},
      {from: 'src/css', to: '../css'}
    ]),
    new DefinePlugin({
      'process.env': {
        'ENV': process.env.NODE_ENV,
        'NODE_ENV': process.env.NODE_ENV
      }
    })
  ]
};

module.exports = config;
