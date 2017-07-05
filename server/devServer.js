import express from 'express'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import argv from 'minimist'
import webpackConfig from '../webpack/webpack.client.config'

const compiler = webpack(webpackConfig)
const app = express()
const publicPath = webpackConfig.output.publicPath

if (argv(process.argv.slice(2)).client === 'only') {
  app.use(devMiddleware(compiler))
  app.use(hotMiddleware(compiler))
} else {
  app.use(
    devMiddleware(compiler, {
      publicPath
    })
  )
  app.use(
    hotMiddleware(compiler, {
      publicPath
    })
  )
}

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`frontend dev server is running at ${PORT}`)
})
