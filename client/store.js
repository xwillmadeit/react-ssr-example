import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
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

  return store
}
