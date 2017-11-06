const glob = require('glob'),
  path = require('path'),
  CompressionPlugin = require('compression-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  PurifyCSSPlugin = require('purifycss-webpack'),
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
  new CompressionPlugin({
    asset: '[path].gz[query]',
    test: /\.min\.js$/
  }),
  new DefinePlugin({
    'process.env': env
  })
];

module.exports = webpackConfig;
