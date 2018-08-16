const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const webpackConfig = require('./webpack.config.base')
const helpers = require('./helpers')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const env = require('../environment/prod.env')

webpackConfig.mode = "production"

webpackConfig.module.rules = [...webpackConfig.module.rules,
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      process.env.NODE_ENV !== 'production' ? 'style-loader' : 'MiniCssExtractPlugin.loader',
      'css-loader',
      'sass-loader'
    ]
  },
  {
    test: /\.(jpg|png|gif)$/,
    loader: 'file-loader',
    options: {
      regExp: /(img\/.*)/,
      name: '[name].[ext]',
      publicPath: '../',
      outputPath: 'assets/img/'
    }
  },
  {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    loader: 'file-loader',
    options: {
      regExp: /(fonts\/.*)/,
      name: '[name].[ext]',
      publicPath: '../',
      outputPath: 'fonts/'
    }
  }
]

// ensure ts lint fails the build
webpackConfig.module.rules[0].options = {
  failOnHint: true
}

webpackConfig.optimization = {
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  },
  minimizer: [
    new UglifyJsPlugin()
  ]
}

webpackConfig.plugins = [...webpackConfig.plugins,
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  }),
  new OptimizeCssAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
      discardUnused: false,
      discardComments: {
        removeAll: true
      }
    },
    canPrint: true
  }),
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
  new CompressionPlugin({
    asset: '[path].gz[query]',
    test: /\.js$/
  }),
  new DefinePlugin({
    'process.env': env
  }),
  new FaviconsWebpackPlugin(helpers.root('/src/icon.png'))
]

module.exports = webpackConfig
