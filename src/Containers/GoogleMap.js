import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import GoogleMap from '../Components/GoogleMap'

import GeoPosition from './GeoPosition'
import Button from '../Components/Button'
import ModalOverlay from '../Components/ModalOverlay'

import * as actions from "../Redux/Actions/getGeoPosition";


class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
  }

  handleToggleSidebar() {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  render() {

    const { showModal } = this.state
    const { geoPosition } = this.props

    const center = (geoPosition.lat && geoPosition.lng && !geoPosition.loading)
      ?
      {
        lat: geoPosition.lat,
        lng: geoPosition.lng,
      }
      :
      {
        lat: 45.480709,
        lng: 9.2030196,
      }

    return (
      <React.Fragment>

        <MapContainer>
          <GoogleMap center={center} />
        </MapContainer>

        <ButtonContainer>
          <Button
            onClick={this.handleToggleSidebar}
          >Inserisci un nuovo commento</Button>
        </ButtonContainer>

        {
          <ModalOverlay showModal={showModal} closeModal={this.handleToggleSidebar} >
            <OverlayHeader>qui header</OverlayHeader>
            <GeoPosition label="Geolocalizzami" />
          </ModalOverlay>
        }

      </React.Fragment>
    )
  }

}






const Err = styled.div`
  color: red;
`

const ButtonContainer = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  padding: 0 3rem;
  bottom: 0;
  text-align: center;
`
const Sidebar = styled.div`
  position: fixed;
  right: 0;
  width: 300px;
  top: 0;
  bottom: 0;
  background-color: white;
  transition: all .3s;
  transform: ${props => props.showModal ? 'transalate(0,0)' : 'translate(100%,0)'};
`

const OverlayHeader = styled.div`
  border-bottom: 1px solid grey;
`

const MapContainer = styled.div`
  height: 400px;
  border: 1px solid red;
`

const mapStateToProps = (state) => ({
  geoPosition: state.geoPosition,
})



export default connect(
  mapStateToProps,
  actions,
)(Map)
