
export const GET_GEOPOSITION = 'GET_GEOPOSITION';
export const DENY_GEOPOSITION = 'DENY_GEOPOSITION';
export const LOADING_GEOPOSITION = 'LOADING_GEOPOSITION';

const denyGeoPosition = (position) => ({
  type: DENY_GEOPOSITION,
  position,
})

const geoPosition = (position) => ({
  type: GET_GEOPOSITION,
  position,
})

const loadingGeoPosition = (position) => ({
  type: LOADING_GEOPOSITION,
  position,
})


const askForGeoPosition = () => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject))
}

export function getGeoPosition() {
  return (dispatch) => {
    const action = loadingGeoPosition({ lat: null, lon: null, loading: true })
    dispatch(action)
    askForGeoPosition()
      .then((position) => {
        const { coords } = position;
        const { latitude: lat, longitude: lon } = coords;
        const action = geoPosition({ lat, lon, err: false, loading: false })
        dispatch(action)
      })
      .catch(() => {
        const action = denyGeoPosition({ lat: null, lon: null, err: true, loading: false })
        dispatch(action)
      })
  };
}
