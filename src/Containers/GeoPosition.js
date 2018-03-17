import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import * as actions from "../Redux/Actions/getGeoPosition";
import geolib from 'geolib'
import Loading from '../Components/Loading'
import Button from '../Components/Button'

class GeoPosition extends Component {

  constructor(props) {
    super(props)
    this.calculateDistanceFromGravedona = this.calculateDistanceFromGravedona.bind(this)
  }

  calculateDistanceFromGravedona(geoPosition) {
    if (!(geoPosition.lat && geoPosition.lon)) return null
    const distance = geolib.getDistance(
      { latitude: geoPosition.lat, longitude: geoPosition.lon },
      { latitude: "46.153605", longitude: "9.295829" }
    );

    return distance / 1000
  }

  render() {

    const { geoPosition, getGeoPosition } = this.props

    const { lat, lon, err, loading } = geoPosition

    return (
      <React.Fragment>
        {
          !loading && !lat && !lon &&
          <Button onClick={getGeoPosition}>
            per iniziare clicca qui
          </Button>
        }
        {
          lat && lon && !err &&
          <p>{this.calculateDistanceFromGravedona(geoPosition)} km da Gravedona</p>
        }

        {err && <Err>Hai bloccato la geolocalizzazione</Err>}
        {loading && <Loading>loading</Loading>}
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => ({
  geoPosition: state.geoPosition,
})

const Err = styled.div`
  color: red;
`


export default connect(
  mapStateToProps,
  actions,
)(GeoPosition)
