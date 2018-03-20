import React, { Component } from 'react'
import { compose, withProps } from 'recompose'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"

const Map = ({ center }) => (
  <GoogleMap
    defaultZoom={8}
    center={center}
    defaultCenter={center}
  >
    <Marker position={center} />
  </GoogleMap>
)


const composedMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, border: '2px solid violet' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(Map)

export default composedMap