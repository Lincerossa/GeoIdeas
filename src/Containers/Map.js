import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import GoogleMap from '../Components/GoogleMap'

import GeoPosition from './GeoPosition'
import Button from '../Components/Button'
import Loading from '../Components/Loading'
import ModalOverlay from '../Components/ModalOverlay'
import Form from '../Components/Form'


import * as actions from "../redux/actions/manageMarkers";
import Input from '../Components/Input'


console.log("actios", actions.manageMarkers)
class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  

  handleToggleSidebar() {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  componentDidMount() {
    console.log('monta marcello')
    this.props.manageMarkers()
  }

  handleFormSubmit(e){
    e.preventDefault()
    
    const { form, manageMarkers } = this.props
    const { lat, lng } = this.props.geoPosition

    if (
      form.markerGenerator &&
      form.markerGenerator.values &&
      form.markerGenerator.values.address &&
      form.markerGenerator.values.description &&
      form.markerGenerator.values.category &&
      lat && lng
    ) {

      const { address, category, description } = form.markerGenerator.values
      
      const markerObject = {
        lat,
        lng,
        address,
        category,
        description,
      }
      console.log("markerObject", markerObject)
      manageMarkers(markerObject)
    }
  }

  render() {
    const { showModal, } = this.state
    const { geoPosition, markers } = this.props

    const address = geoPosition.address || ''

    const geoPositionRetrieved = geoPosition.lat && 
      geoPosition.lng && 
      !geoPosition.loading

    const lat = geoPositionRetrieved ? geoPosition.lat : 40.480709
    const lng = geoPositionRetrieved ? geoPosition.lng : 9.2030196

    return (
      <Container>

        <MapContainer>
          <GoogleMap
            markers={markers}
            center={{ lat, lng }}
            zoom={geoPositionRetrieved ? 9 : 3}
            showMarker={geoPositionRetrieved}
          />
          <GeoPositionContainer>
            <GeoPosition>
              {({ getGeoPosition }) => (
                <IconWrapper onClick={getGeoPosition}>
                  <div className="material-icons">location_city</div>
                </IconWrapper>
              )}
            </GeoPosition>
          </GeoPositionContainer>
          {geoPosition && geoPosition.loading && <Loading />}
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
              <Form
                handleSubmit={this.handleFormSubmit}
                fields = {[
                  {
                    name: 'address',
                    component:'input',
                    value: geoPosition.address,
                    type:'text',
                    label:'localita'
                  },
                  {
                    name: 'category',
                    component: 'input',
                    type: 'text',
                    label: 'categoria'
                  },
                  {
                    name: 'description',
                    component: 'input',
                    type: 'text',
                    label: 'descrizione'
                  },
                ]}
              />
          
            </FormContainer>
            
          </ModalOverlay>
        }

      </Container>
    )
  }

}

const Container = styled.div`
`


const FormContainer = styled.div`
  margin: 1rem 0;
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
  background: black;
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
  position: relative;
  height: calc(100vh - 60px - 120px);
`

const GeoPositionContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%,50%);
  bottom: 0;
  padding: .5rem;
  background: orange;
  border-radius: 50%;

  @media screen and (min-width: 768px) {

    right: 1rem;
    transform: translate(0,-50%);
    top: 50%;
    left: auto;
    bottom: auto;
    padding: 2rem;
    cursor: pointer;
  }


`


const mapStateToProps = (state) => ({
  geoPosition: state.geoPosition,
  markers: state.markers,
  form: state.form,
})



export default connect(
  mapStateToProps,
  actions,
)(Map)
