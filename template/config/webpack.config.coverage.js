const webpackConfig = require("./webpack.config.base")
  DefinePlugin = require('webpack/lib/DefinePlugin'),
  SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin'),
  env = require('../environment/dev.env');

webpackConfig.module.rules[1].query = {
  compilerOptions: {
    inlineSourceMap: true,
    sourceMap: false
  }
};

webpackConfig.module.rules = [...webpackConfig.module.rules,
  {
    test: /\.ts$/,
    enforce: "post",
    loader: "istanbul-instrumenter-loader",
    exclude: [
      "node_modules",
      /\.spec\.ts$/
    ],
    query: {
      esModules: true
    }
  }
];

webpackConfig.plugins = [...webpackConfig.plugins,
  new SourceMapDevToolPlugin({
    filename: null, // if no value is provided the sourcemap is inlined
    test: /\.(ts|js)($|\?)/i
  }),
  new DefinePlugin({
    'process.env': env
  })
];

webpackConfig.devtool = "inline-source-map";

module.exports = webpackConfig;
