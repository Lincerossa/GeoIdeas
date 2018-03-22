import { MARKERS_UPDATE } from '../actions/getMarkers'

const initialState = [
  {
    lat: 45,
    lng: 55,
    category: 'traffico',
    emoji: ['😃', '😱'],
    description: 'semaforo rotto',
    
  },
  {
    lat: 44,
    lng: 55,
    category: 'traffico',
    emoji: ['😡', '😱'],
    description: 'semaforo brutto',
  },
  {
    lat: 33,
    lng: 55,
    category: 'traffico',
    emoji: ['😡', '😱'],
    description: 'strada rotta',
  },
]


export default (state = initialState, action) => {


  switch (action.type) {

    case MARKERS_UPDATE:
      return [
        ...state,
        ...action.markes,
      ]

    default:
      return state
  }

}