export const MARKERS_ADD = 'MARKERS_ADD'
export const MARKERS_RETRIEVE = 'MARKERS_RETRIEVE'

import {
  getDatabaseMarkersReference,
  removePoint,
} from '../../utility/getDatabaseReference'


const retrieveMarkers = markers => ({
  type: MARKERS_RETRIEVE,
  markers
})

const addMarker = (marker) => ({
  type: MARKERS_ADD,
  marker,
})


const addNewMarker = (marker) => {
  const markers = getDatabaseMarkersReference();

  const { lat, lng, address, category, description } = marker

  const newLat = removePoint(lat.toString())
  const newLng = removePoint(lng.toString())

  markers.update({
    [`${newLat}-${newLng}`]: {
      lat,
      lng,
      address,
      category,
      description,
    },
  })
}



export function manageMarkers(marker) {
  return (dispatch) => {
    getDatabaseMarkersReference().once('value')
      .then((snapshot) => {
        console.log("thene")
        if (marker) {
          addNewMarker(marker)
        }

        const markers = snapshot.val()

        const toArr = Object.keys(markers)
          .map(key => {
            return markers[key]
          })

        dispatch(retrieveMarkers(toArr))




      })

    }
}