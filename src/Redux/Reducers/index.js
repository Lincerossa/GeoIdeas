import { combineReducers } from 'redux'
import geoPosition from './geoPosition'
import login from './login'
import markers from './markers'

export default combineReducers({
  geoPosition,
  login,
  markers,
})