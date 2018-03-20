import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"
import GeoPosition from './GeoPosition'
import Button from '../Components/Button'
import ModalOverlay from '../Components/ModalOverlay'

import * as actions from "../Redux/Actions/getGeoPosition";

class Map extends Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      geoPosition: props.geoPosition,
    }
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
  }

  componentWillReceiveProps(nextProps){
    const { geoPosition } = nextProps
    if (geoPosition !== this.state.geoPosition) {
      this.setState({
        geoPosition,
      })
    }
  }

  handleToggleSidebar() {

    this.setState({
      showModal: !this.state.showModal,
    })

  }

  render() {

    const {
      geoPosition, 
      showModal 
    } = this.state

    const center = (geoPosition.lat && geoPosition.lon && !geoPosition.loading)
      ? 
        {
          lat: geoPosition.lat,
          lng: geoPosition.lon,
        }
      : 
        {
          lat: -45.480709,
          lng: 9.2030196, 
        }



    
    
    
    
    
    return (
      <React.Fragment>
        <GoogleMap
          defaultZoom={8}
          center={center}
          defaultCenter={center}
        >
          <Marker position={{ lat: geoPosition.lat || -335, lng: geoPosition.lon || 150 }} />
        </GoogleMap>
        <ButtonContainer>
          <Button 
            onClick={this.handleToggleSidebar}
          >Inserisci un nuovo commento</Button>
        </ButtonContainer>

        {
          <ModalOverlay showModal={showModal} closeModal={this.handleToggleSidebar} >
            <OverlayHeader>qui header</OverlayHeader>
            <GeoPosition 
              label="Geolocalizzami"
            />
          </ModalOverlay>
        }
        
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

const mapIncredibile = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(Map)



export default connect(
  mapStateToProps,
  actions,
)(mapIncredibile)
