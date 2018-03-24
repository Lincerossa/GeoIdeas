import React, { Component } from 'react'
import { compose, withProps } from 'recompose'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

import ModalOverlay from './ModalOverlay'

const MAP_KEY = 'AIzaSyCczDTBugHreC89NuyVmugAEUGKalukPAs'

const Icon = () => (
  <p>icona</p>
)



class Map extends Component {


  constructor(props){
    super(props)
    this.state={
    }
    this.handleToggleMarker = this.handleToggleMarker.bind(this)
  }


  handleToggleMarker(activeMarkerId) {
    this.setState({
      activeMarkerId
    })
    console.log("activeMarkerId", activeMarkerId)
  }



  render() {

    const { center, zoom, showMarker, markers } = this.props

    const { activeMarkerId } = this.state
    return (
      <GoogleMap
        zoom={zoom}
        center={center}
      >
        {
          markers &&
          markers.length &&
          <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={2}
          >
            {
              markers.map((marker, index) => (
                <React.Fragment>
                  <Marker
                    key={index}
                    onMouseOver={() => this.handleToggleMarker(index)}
                    onTouchStart={() => this.handleToggleMarker(index)}
                    position={{ lat: marker.lat, lng: marker.lng }}
                  >
                  </Marker>
                  { 
                    (activeMarkerId === index) &&
                    <ModalOverlay
                      showModal
                      closeModal={this.handleToggleMarker}
                    >
                      <p>{marker.lat}</p>
                      <p>{marker.lng}</p>
                      <p>{marker.address}</p>
                      <p>{marker.category}</p>
                      <p>{marker.description}</p>
                    </ModalOverlay>
                  }
                </React.Fragment>
              ))}
          </MarkerClusterer>
        }
      </GoogleMap>)
  }
}



const composedMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3exp&libraries=geometry,drawing,places&key=${MAP_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`}} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(Map)

export default composedMap