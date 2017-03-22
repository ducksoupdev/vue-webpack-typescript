const helpers = require("./helpers"),
  webpackConfig = require("./webpack.config.base")

webpackConfig.devServer = {
  port: 8080,
  host: "localhost",
  historyApiFallback: true,
  watchOptions: {aggregateTimeout: 300, poll: 1000},
  contentBase: './src',
  open: true
};

module.exports = webpackConfig;
