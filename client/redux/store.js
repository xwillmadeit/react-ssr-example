import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import rootReducer from './reducers'

export default (initialState = {}) => {
  const enhancers = [
    applyMiddleware(thunk),
    __DEV__ &&
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f
  ]

  const store = createStore(rootReducer, initialState, compose(...enhancers))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      try {
        const nextReducer = require('./reducers').default

        store.replaceReducer(nextReducer)
      } catch (error) {
        console.error(chalk.red(`==> 😭  Reducer hot reloading error ${error}`))
      }
    })
  }

  return store
}
