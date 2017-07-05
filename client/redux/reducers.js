import { combineReducers } from 'redux'

import home from '../reducers/homeReducer'
import userInfo from '../reducers/userReducer'

export default combineReducers({
  home,
  userInfo
})
