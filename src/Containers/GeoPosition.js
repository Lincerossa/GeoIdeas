import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import * as actions from "../redux/actions/getGeoPosition";
import Button from '../Components/Button'

const GeoPosition = ({ geoPosition, getGeoPosition, children }) => {

  const { lat, lon, err, loading } = geoPosition

  return (
    <React.Fragment>
      {children({
        getGeoPosition,
      })}
      {err && <Err>Hai bloccato la geolocalizzazione</Err>}
    </React.Fragment>
  )
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
