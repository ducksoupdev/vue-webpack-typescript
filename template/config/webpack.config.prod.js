const glob = require('glob'),
  path = require('path'),
  UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CompressionPlugin = require('compression-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  PurifyCSSPlugin = require('purifycss-webpack'),
  FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
  autoprefixer = require('autoprefixer'),
  webpackConfig = require('./webpack.config.base'),
  helpers = require('./helpers'),
  DefinePlugin = require('webpack/lib/DefinePlugin'),
  env = require('../environment/prod.env');

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});

const purifyCss = new PurifyCSSPlugin({
  paths: glob.sync(path.join(__dirname, '../src/**/*.html')),
  purifyOptions: {
    info: true,
    whitelist: []
  }
});

webpackConfig.module.rules = [...webpackConfig.module.rules,
  {
    test: /\.scss$/,
    use: extractSass.extract({
      use: [{
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: true,
            importLoaders: 2
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer]
          }
        },
        {
          loader: 'sass-loader',
          options: {
            outputStyle: 'expanded',
            sourceMap: true,
            sourceMapContents: true
          }
        }
      ],
      // use style-loader in development
      fallback: 'style-loader'
    })
  },
  {
    test: /\.(jpg|png|gif)$/,
    loader: 'file-loader?name=assets/img/[name].[ext]'
  },
  {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    loader: 'file-loader?name=fonts/[name].[ext]'
  }
];

// ensure ts lint fails the build
webpackConfig.module.rules[0].options = {
  failOnHint: true
};

webpackConfig.plugins = [...webpackConfig.plugins,
  extractSass,
  purifyCss,
  new HtmlWebpackPlugin({
    inject: true,
    template: helpers.root('/src/index.html'),
    favicon: helpers.root('/src/favicon.ico'),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }),
  new UglifyJsPlugin({
    include: /\.min\.js$/,
    minimize: true
  }),
  new CompressionPlugin({
    asset: '[path].gz[query]',
    test: /\.min\.js$/
  }),
  new DefinePlugin({
    'process.env': env
  }),
  new FaviconsWebpackPlugin(helpers.root('/src/icon.png'))
];

module.exports = webpackConfig;
