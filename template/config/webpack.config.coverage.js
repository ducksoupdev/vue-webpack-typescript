const webpackConfig = require("./webpack.config.base");

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

webpackConfig.devtool = "inline-source-map";

module.exports = webpackConfig;
