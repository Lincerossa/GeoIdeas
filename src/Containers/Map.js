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
      localita: '',
    }
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleLocalitaChange = this.handleLocalitaChange.bind(this)
    this.getAddressFromLatLng = this.getAddressFromLatLng.bind(this)
  }
  

  handleToggleSidebar() {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  handleFormSubmit(){
    console.log("handleFormSubmit")
  }

  getAddressFromLatLng({lat, lng}) {
    var geocoder = new google.maps.Geocoder()
    var location = new google.maps.LatLng(lat, lng)      
    geocoder.geocode({ 'latLng': location }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        this.setState({
          localita: results[0].formatted_address
        })
        return 
      }
    })
  }

  handleLocalitaChange(value) {
    this.setState({
      localita: value
    })
  }

  componentWillReceiveProps(nextProps) {

    const { geoPosition } = nextProps

    if ((geoPosition.lat && geoPosition.lng && !geoPosition.loading)) {
      const { lat, lng } = geoPosition

      this.getAddressFromLatLng({
        lat: parseFloat(lat.toFixed(2)),
        lng: parseFloat(lng.toFixed(2)) 
      })
    }
  }

  render() {

    const { showModal, localita } = this.state
    const { geoPosition } = this.props

    const geoPositionRetrieved = (geoPosition.lat && geoPosition.lng && !geoPosition.loading)

    const lat = geoPositionRetrieved ? geoPosition.lat : 45.480709
    const lng = geoPositionRetrieved ? geoPosition.lng : 9.2030196

    return (
      <Container>

        <MapContainer>
          <GoogleMap center={{ lat, lng }} />
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

                <FieldWrapper>
                  <Input
                    type="text"
                    label="località"
                    handleChange={this.handleLocalitaChange}
                    value={localita}
                  />
                  <GeoPosition>
                    {({ getGeoPosition }) => (
                      <IconWrapper onClick={getGeoPosition}>
                        <div className="material-icons">location_city</div>
                      </IconWrapper>
                    )}
                  </GeoPosition>
                </FieldWrapper>

              </Form>
            </FormContainer>
            
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
  margin: 1rem 0;
`

const Form = styled.form`
`

const FieldWrapper = styled.div`
  border-bottom: 1px solid grey;
  margin-bottom: .5rem;
  padding-bottom: .5rem;
  display: flex;
`


const IconWrapper = styled.div`
  cursor: pointer;
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
