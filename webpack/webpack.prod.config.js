const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')
const paths = require('./paths')
const isomorphicConfig = require('./isomorphic-config')

const webpack_isomorphic_tools_plugin = new Webpack_isomorphic_tools_plugin(
  isomorphicConfig
).development()

module.exports = {
  entry: {
    app: paths.appIndexJs,
    vendor: ['react', 'react-dom']
  },
  output: {
    path: paths.appBuild,
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: '/build/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: paths.appNodeModules,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: paths.appNodeModules,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9'
                    ]
                  })
                ]
              }
            },
            'sass-loader'
          ]
        })
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
      names: ['common', 'vendor'],
      minChunks: 2
    }),
    new ExtractTextPlugin('css/style.[contenthash:8].css'),
    webpack_isomorphic_tools_plugin
  ]
}
