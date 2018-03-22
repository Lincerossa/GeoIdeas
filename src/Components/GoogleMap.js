import React, { Component } from 'react'
import { compose, withProps } from 'recompose'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MAP_KEY = 'AIzaSyCczDTBugHreC89NuyVmugAEUGKalukPAs'

const Map = ({ center, zoom, showMarker, markers }) => {

  return(
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
        gridSize={60}
      >
        {
          markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </MarkerClusterer>
    }
  </GoogleMap>)
}



const composedMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAP_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`}} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(Map)

export default composedMap