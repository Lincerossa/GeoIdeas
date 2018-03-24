
import uiid from 'uuid/v4'
import { getDatabaseReference } from '../../utility'

export const MARKERS_ADD = 'MARKERS_ADD'
export const MARKERS_RETRIEVE = 'MARKERS_RETRIEVE'

const retrieveMarkers = markers => ({
  type: MARKERS_RETRIEVE,
  markers
})

const addMarker = (marker) => ({
  type: MARKERS_ADD,
  marker,
})


const addNewMarker = ({ lat, lng, address, category, description }, ref) => {
  
  ref.update({
    [uiid()]: {
      lat,
      lng,
      address,
      category,
      description,
    },
  })
}


const getArrFromObj = obj => Object.keys(obj).map(key => obj[key])


export function manageMarkers(marker) {
  return (dispatch) => {
    
    const ref = getDatabaseReference('markers/')

    ref.once('value')
      .then((snapshot) => {
        if (marker) {
          addNewMarker(marker, ref)
        }

        const markers = getArrFromObj(snapshot.val())

        dispatch(retrieveMarkers(markers))




      })

    }
}