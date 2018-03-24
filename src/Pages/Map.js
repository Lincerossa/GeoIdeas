import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import GoogleMap from '../Components/GoogleMap'

import Button from '../Components/Button'
import Loading from '../Components/Loading'
import ModalOverlay from '../Components/ModalOverlay'
import Form from '../Containers/Form'


import * as actions from "../redux/actions/manageMarkers";
import Input from '../Components/Input'


class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleToggleSidebar() {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  componentDidMount() {
    this.props.manageMarkers()
  }

  handleSubmit({
    e,
    address,
    lat,
    lng,
    loading,
  }) {
    e.preventDefault()

    const { form, manageMarkers } = this.props


    if (
      form.markerGenerator &&
      form.markerGenerator.values &&
      form.markerGenerator.values.description &&
      form.markerGenerator.values.category &&
      (address || form.markerGenerator.values.address)
    ) {

      const { category, description } = form.markerGenerator.values

      const markerObject = {
        lat,
        lng,
        address: form.markerGenerator.values.address || address,
        category,
        description,
      }

      manageMarkers(markerObject)
    }
  }

  render() {
    const { showModal, } = this.state
    const { geoPosition, markers } = this.props

    const {
      address,
      lat,
      lng,
      loading
    } = geoPosition

    return (
      <Container>

        <MapContainer>
          <GoogleMap
            markers={markers}
            center={{ lat, lng }}
            zoom={!loading ? 9 : 2}
            showMarker={!loading}
          />

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
                handleSubmit={(e) => this.handleSubmit({
                  e,
                  address,
                  lat,
                  lng,
                  loading,
                })}
                fields={[
                  {
                    name: 'address',
                    placeholder: 'via volta 55, Gravedona ed Uniti(CO)',
                    component: 'input',
                    type: 'text',
                    label: 'localita'
                  },
                  {
                    name: 'category',
                    placeholder: 'segnaletica stradale',
                    component: 'input',
                    type: 'text',
                    label: 'categoria'
                  },
                  {
                    name: 'description',
                    placeholder: 'semaforo rotto',
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


const mapStateToProps = (state) => ({
  geoPosition: state.geoPosition,
  markers: state.markers,
  form: state.form,
})



export default connect(
  mapStateToProps,
  actions,
)(Map)
