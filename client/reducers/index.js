import { combineReducers } from 'redux'

import home from './homeReducer'
import userInfo from './userReducer'

export default combineReducers({
  home,
  userInfo
})
