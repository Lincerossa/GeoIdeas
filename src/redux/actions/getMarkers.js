export const MARKERS_UPDATE = 'MARKERS_UPDATE'

import { getDatabaseMarkersReference } from '../../utility/getDatabaseReference'



const updateMarkers = (markers) => ({
  type: MARKERS_UPDATE,
  markers,
})




export function getMarkers() {
  return (dispatch) => {
    getDatabaseMarkersReference()
      .on('value', (snapshot) => {

        const markers = snapshot.val()
        if (!markers) return null

        dispatch(updateMarkers([
          {
            lat: '45',
            lng: '33',
            category: 'traffico',
            emoji: ['😃', '😱'],
            description: 'semaforo rotto',
          },
        ]))
        console.log("markers")
      })
    }
}