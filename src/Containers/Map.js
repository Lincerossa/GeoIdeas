import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import GoogleMap from '../Components/GoogleMap'

import GeoPosition from './GeoPosition'
import Button from '../Components/Button'
import ModalOverlay from '../Components/ModalOverlay'

import * as actions from "../Redux/Actions/getGeoPosition";
import Input from '../Components/Input'

class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleLocalitaChange = this.handleLocalitaChange.bind(this)
  }

  handleToggleSidebar() {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  handleFormSubmit(){
    console.log("handleFormSubmit")
  }

  handleLocalitaChange(value) {
    this.setState({
      localita: value
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

    const localita = this.state.localita || 
      (geoPosition && geoPosition.lat && geoPosition.lng && `${geoPosition.lat}, ${geoPosition.lng}`) || ''

    
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
            <OverlayHeader>Sezione inserimento</OverlayHeader>

            <FormContainer>
              <Form onSubmit={this.handleFormSubmit}>


                <Input
                  type="text"
                  label="località"
                  handleChange={this.handleLocalitaChange}
                  value={localita}
                />

              </Form>
            </FormContainer>






            <ButtonContainer>
              <GeoPosition
                label="Geolocalizzami" 
              />
            </ButtonContainer>
          </ModalOverlay>
        }

      </Container>
    )
  }

}

const Container = styled.div`
  display: flex;
`


const FormContainer = styled.div`
  border: 1px solid grey;
`

const Form = styled.form`

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
  text-align: center;
  font-size: 1.5rem;
  padding: .5rem 0;
  text-transform: uppercase;
  letter-spacing: .1em;
`

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 60px - 120px);
`


const mapStateToProps = (state) => ({
  geoPosition: state.geoPosition,
})



export default connect(
  mapStateToProps,
  actions,
)(Map)
