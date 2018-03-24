
import uiid from 'uuid/v4'
import { getDatabaseReference, getArrFromObj } from '../../utility'

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

const addMarkerToDatabase = ({ lat, lng, address, category, description }, ref) => {
  return ref.update({
    [uiid()]: {
      lat,
      lng,
      address,
      category,
      description,
    },
  })
}

export function manageMarkers(marker) {
  return async (dispatch) => {
    
    const ref = getDatabaseReference('markers/')

    if (marker) {
      await addMarkerToDatabase(marker, ref)
      dispatch(addMarker([marker]))
      return false
    }
    const snapshot = await ref.once('value')
    const markers = getArrFromObj(snapshot.val())
    dispatch(retrieveMarkers(markers))
  }
}