import express from 'express'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import webpackConfig from '../webpack/webpack.client.config'

const compiler = webpack(webpackConfig)

const app = express()

app.use(
  devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  })
)

app.use(
  hotMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  })
)

app.listen(4000, () => {
  console.log('app is running at 4000')
})
