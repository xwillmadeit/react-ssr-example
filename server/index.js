import 'babel-polyfill'
import WebpackIsomorphicTools from 'webpack-isomorphic-tools'
import { resolve } from 'path'
import webpackIsomorphicConfig from '../webpack/isomorphic-config'

// Setup global variables for server
global.__CLIENT__ = false
global.__SERVER__ = true
global.__DISABLE_SSR__ = false // Disable server side render here
global.__DEV__ = process.env.NODE_ENV !== 'production'

const dirRoot = resolve(process.cwd())

global.webpackIsomorphicTools = new WebpackIsomorphicTools(
  webpackIsomorphicConfig
).server(dirRoot, () => {
  require('./server')
})
