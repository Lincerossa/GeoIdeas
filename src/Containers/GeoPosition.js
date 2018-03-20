import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import * as actions from "../Redux/Actions/getGeoPosition";
import Loading from '../Components/Loading'
import Button from '../Components/Button'

const GeoPosition = ({ geoPosition, getGeoPosition, label }) => {

  const { lat, lon, err, loading } = geoPosition

  return (
    <React.Fragment>
      <Button onClick={getGeoPosition}>{label}
      </Button>

      {err && <Err>Hai bloccato la geolocalizzazione</Err>}
      {loading && <Loading>loading</Loading>}
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
