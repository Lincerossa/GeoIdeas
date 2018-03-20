import { GET_GEOPOSITION, DENY_GEOPOSITION, LOADING_GEOPOSITION } from '../Actions/getGeoPosition'

const initialState = {
  lat: null,
  lng: null,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_GEOPOSITION:
      return action.position

    case DENY_GEOPOSITION:
      return action.position

    case LOADING_GEOPOSITION:
      return action.position

    default:
      return state
  }
}
