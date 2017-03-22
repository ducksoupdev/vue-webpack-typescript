const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin'),
  CompressionPlugin = require('compression-webpack-plugin'),
  webpackConfig = require("./webpack.config.base"),
  helpers = require("./helpers");

webpackConfig.entry["main.min"] = helpers.root("/src/main.ts");

webpackConfig.plugins = [...webpackConfig.plugins,
  new UglifyJsPlugin({
    include: /\.min\.js$/,
    minimize: true
  }),
  new CompressionPlugin({
    asset: "[path].gz[query]",
    test: /\.min\.js$/
  })
];

module.exports = webpackConfig;
