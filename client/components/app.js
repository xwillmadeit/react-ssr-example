import React from 'react'
import { Route, Switch } from 'react-router-dom'
import _ from 'lodash'
import routes from '../routes'
import leopard from '../images/leopard.png'
import '../scss/main.scss'

export default () => {
  const routeWithSubRoutes = route =>
    <Route
      key={_.uniqueId()}
      exact={route.exact || false}
      path={route.path}
      render={props => <route.component {...props} routes={route.routes} />}
    />

  return (
    <div>
      <div>
        <h1>hello server side rendering!</h1>
        <img src={leopard} />
      </div>
      <hr />
      <Switch>
        {routes.map(route => routeWithSubRoutes(route))}
      </Switch>
    </div>
  )
}
