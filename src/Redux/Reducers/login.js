import { LOGOUT } from '../Actions/logout'
import { LOGIN } from '../Actions/handleLogin'


const initialState = {
  username: 'nome iniziale'
}

export default (state = initialState, action) => {
  switch (action.type) {

    case LOGIN:
    
      return action.login

    case LOGOUT:
      return initialState

    default:
      return state
  }
}