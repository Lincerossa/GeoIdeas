import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import Form from '../Components/Form';


import styled from 'styled-components'
import { connect } from 'react-redux'

import * as actions from "../redux/actions/manageMarkers";
import Input from '../Components/Input'

const FormConnected = reduxForm({
  form: 'markerGenerator'
})(Form)



class FormMarker extends Component {


  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit({
    e,
    address,
    lat,
    lng,
    loading,
  }) {
    e.preventDefault()
    console.log("ok")
    debugger

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
      console.log("markerObject", markerObject)
      manageMarkers(markerObject)
    }
    debugger
    return false
  }

  render(){

    const { address, lat, lng, loading} = this.props.geoPosition
    return(

      <FormConnected
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
    )
  }
}

const mapStateToProps = (state) => ({
  geoPosition: state.geoPosition,
  form: state.form,
})


export default connect(
  mapStateToProps,
  actions,
)(FormMarker)