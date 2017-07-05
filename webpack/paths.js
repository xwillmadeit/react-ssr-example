const { resolve } = require('path')

const resolveApp = relativePath => resolve(process.cwd(), relativePath)

module.exports = {
  appBuild: resolveApp('server/public/build'),
  appHtml: resolveApp('client/index.html'),
  appIndexJs: resolveApp('client/index.js'),
  appNodeModules: resolveApp('node_modules')
}
