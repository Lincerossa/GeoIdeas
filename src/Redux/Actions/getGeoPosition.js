
export const GET_GEOPOSITION = 'GET_GEOPOSITION';
export const DENY_GEOPOSITION = 'DENY_GEOPOSITION';
export const LOADING_GEOPOSITION = 'LOADING_GEOPOSITION';

const denyGeoPosition = () => ({
  type: DENY_GEOPOSITION,
})

const geoPosition = (position) => ({
  type: GET_GEOPOSITION,
  position,
})

const loadingGeoPosition = () => ({
  type: LOADING_GEOPOSITION,
})


const askForGeoPosition = () => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject))
}

const getAddressFromLatLng = ({ lat, lng }) => {
  var geocoder = new google.maps.Geocoder()
  var location = new google.maps.LatLng(lat, lng)

  const promiz = new Promise((resolve, reject) => {

    geocoder.geocode({ 'latLng': location }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve(results[0].formatted_address)
      }
      reject()
    }, reject)
  })

  return promiz
}


export const getGeoPosition = () => {

  return async (dispatch) => {

    dispatch(loadingGeoPosition())

    const position = await askForGeoPosition()
      .catch(() => {
        dispatch(denyGeoPosition())
      })

    if (!position) return
    
    const { coords } = position;
    const { latitude: lat, longitude: lng } = coords;

    const address = await getAddressFromLatLng({ lat, lng })

    dispatch(geoPosition({ lat, lng, address }))

  };

}
