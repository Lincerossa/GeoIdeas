import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { GoogleMap } from '../Components'

import * as actions from '../redux/actions/manageMarkers';

class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.props.manageMarkers()
  }

  render() {
    const { geoPosition, markers } = this.props

    const {
      address,
      lat,
      lng,
      loading
    } = geoPosition
    
    return (
      <Wrapper>
        <GoogleMap
          markers={markers}
          center={{ lat, lng }}
          zoom={!loading ? 9 : 2}
          showMarker={!loading}
        />
      </Wrapper>
    )
  }
}


const Wrapper = styled.div`
  width: 100%;
  position: relative;
  height: calc(100vh - 60px - 120px);
`

const mapStateToProps = (state) => ({
  geoPosition: state.geoPosition,
  markers: state.markers,
  form: state.form,
})


export default connect(
  mapStateToProps,
  actions,
)(MapContainer)
