import React, { Component } from 'react'
import styled from 'styled-components'

import { Button, ModalOverlay} from '../Components'
import { FormMarker, MapContainer } from '../Containers'

class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
    this.handleToggleModal = this.handleToggleModal.bind(this)
  }


  handleToggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    })
  }


  render() {
    const { showModal } = this.state

    return (
      <Container>

        <MapContainer />

        <ButtonWrapper>
          <Button
            onClick={this.handleToggleModal}
          >Inserisci un nuovo commento</Button>
        </ButtonWrapper>

        {
          <ModalOverlay showModal={showModal} closeModal={this.handleToggleModal} >

            <OverlayHeader>Sezione inserimento</OverlayHeader>

            <FormContainer>
              <FormMarker />

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

const ButtonWrapper = styled.div`
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


export default Map