const webpackConfig = require('./webpack.config.base')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin')
const env = require('../environment/dev.env')

webpackConfig.module.rules = [
  {
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
  },
  {
    test: /\.scss$/,
    use: [{
      loader: 'style-loader'
    },
    {
      loader: 'css-loader'
    },
    {
      loader: 'sass-loader'
    }
    ]
  },
  {
    test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
    loader: 'url-loader?limit=8192'
  }
]

webpackConfig.plugins = [...webpackConfig.plugins,
  new SourceMapDevToolPlugin({
    filename: null, // if no value is provided the sourcemap is inlined
    test: /\.(ts|js)($|\?)/i
  }),
  new DefinePlugin({
    'process.env': env
  })
]

webpackConfig.devtool = 'inline-source-map'

module.exports = webpackConfig
