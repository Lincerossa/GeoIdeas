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
      <Container>

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

            <ButtonsGroup>
              <GeoPosition label="Geolocalizzami" />
              <Button onClick={this.handleToggleSidebar}>chiudi </Button>
            </ButtonsGroup>
          </ModalOverlay>
        }

      </Container>
    )
  }

}

const Container = styled.div`
  display: flex;
`


const ButtonContainer = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  padding: 0 3rem;
  bottom: 0;
  height: 120px;
  align-items: center;
  display: flex;
  justify-content: center;
`


const OverlayHeader = styled.div`
  border-bottom: 1px solid lightGrey;
  padding: 1rem 0;
  margin-bottom: 1rem;
`

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 60px - 120px);
`

const ButtonsGroup = styled.div`
  display: flex;
`

const mapStateToProps = (state) => ({
  geoPosition: state.geoPosition,
})



export default connect(
  mapStateToProps,
  actions,
)(Map)
