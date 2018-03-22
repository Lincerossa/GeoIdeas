import {
  GET_GEOPOSITION,
  DENY_GEOPOSITION,
  LOADING_GEOPOSITION,
} from '../actions/getGeoPosition'

const initialState = {
  lat: null,
  lng: null,
  loading: false,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_GEOPOSITION:
      return {
        ...state,
        ...action.position,
        loading: false,
        error: null,
      }

    case DENY_GEOPOSITION:
      return {
        ...state,
        loading: null,
        error: true,
      }

    case LOADING_GEOPOSITION:
      return {
        ...state,
        loading: true,
        error: null,
      }

    default:
      return state
  }
}
