import { combineReducers } from 'redux'
import geoPosition from './geoPosition'
import login from './login'

export default combineReducers({
  geoPosition,
  login,
})