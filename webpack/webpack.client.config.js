const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')
const paths = require('./paths')
const isomorphicConfig = require('./isomorphic-config')
const argv = require('minimist')
const nodeEnv = process.env.NODE_ENV || 'development'
const isDev = nodeEnv !== 'production'

const webpack_isomorphic_tools_plugin = new Webpack_isomorphic_tools_plugin(
  isomorphicConfig
).development()

module.exports = {
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      'react-hot-loader/patch',
      paths.appIndexJs
    ],
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: '[name].bundle.js',
    path: paths.appBuild,
    publicPath:
      argv(process.argv.slice(2)).client === 'only'
        ? '/'
        : 'http://localhost:4000/build/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: paths.appNodeModules,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', { modules: false }], 'react'],
            plugins: ['react-hot-loader/babel', 'transform-class-properties'],
            babelrc: false
          }
        }
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: webpack_isomorphic_tools_plugin.regular_expression('images'),
        loader: `url-loader?limit=10000&name=images/[name].[ext]`
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: isDev
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise'
    }),
    webpack_isomorphic_tools_plugin
  ]
}
