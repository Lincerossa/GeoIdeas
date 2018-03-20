
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
  console.log("prosegue qui")
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject))
}

export function getGeoPosition() {
  console.log("inizia qui")
  return (dispatch) => {
    const action = loadingGeoPosition({ lat: null, lng: null, loading: true })
    dispatch(action)
    askForGeoPosition()
      .then((position) => {
        console.log("nel then")
        
        const { coords } = position;
        const { latitude: lat, longitude: lng } = coords;
        const action = geoPosition({ lat, lng, err: false, loading: false })
        dispatch(action)
      })
      .catch(() => {
        const action = denyGeoPosition({ lat: null, lng: null, err: true, loading: false })
        dispatch(action)
      })
  };
}
