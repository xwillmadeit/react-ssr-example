import express from 'express'
import { resolve } from 'path'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import App from '../client/components/app'
import routes from '../client/routes'
import configureStore from '../client/store'
import Html from './utils/Html'

const app = express()

app.set('view engine', 'ejs')
app.set('views', resolve(__dirname, 'views'))
app.use(express.static(resolve(__dirname, 'public')))

app.get('*', (req, res) => {
  const store = configureStore()
  const renderHtml = (store, htmlContent) => {
    const html = renderToStaticMarkup(
      <Html store={store} htmlContent={htmlContent} />
    )

    return `<!doctype html>${html}`
  }

  if (__DISABLE_SSR__) {
    res.send(renderHtml(store))
    return
  }

  // Load data on server-side
  const loadBranchData = () => {
    const branch = matchRoutes(routes, req.url)

    const promises = branch.map(({ route, match }) => {
      // Dispatch the action(s) through the loadData method of "./routes.js"
      if (route.loadData) return route.loadData(store.dispatch, match.params)

      return Promise.resolve(null)
    })

    return Promise.all(promises)
  }

  // Send response after all the action(s) are dispathed
  loadBranchData()
    .then(() => {
      // Setup React-Router server-side rendering
      const routerContext = {}
      const htmlContent = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={routerContext}>
            <App />
          </StaticRouter>
        </Provider>
      )

      // Check if the render result contains a redirect, if so we need to set
      // the specific status and redirect header and end the response
      if (routerContext.url) {
        res.status(301).setHeader('Location', routerContext.url)
        res.end()
        return
      }

      // Checking is page is 404
      const status = routerContext.status === '404' ? 404 : 200

      // Pass the route and initial state into html template
      res.status(status).send(renderHtml(store, htmlContent))
    })
    .catch(err => {
      res.status(404).send('Not Found :(')

      console.error(`==> Rendering routes error: ${err}`)
    })
})

app.listen(5000, () => {
  console.log('app is running at 5000')
})
