import React, { Component } from 'react'
import Modal from 'react-modal';
import styled from 'styled-components'
import Button from './Button'

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0,
  bottom: 0,
  overflow: 'scroll',
  '-webkit-overflow-scrolling': 'touch',
  left: 0,
  right: 0,
  backgroundColor: '#000',
}


const backdropStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0,
  bottom: 0,
  overflow: 'scroll',
  '-webkit-overflow-scrolling': 'touch',
  left: 0,
  right: 0,
  backgroundColor: '#000',
  zIndex: 'auto',
  backgroundColor: 'transparent',
  opacity: 0.6,
  width: 'calc(100% - 15px)',
}


class ModalOverlay extends Component {
  
  constructor(props){
    super(props)
    this.state={
      centerModal: null
    }
    this.handleModalContentRef = this.handleModalContentRef.bind(this)
  }
  
  handleModalContentRef(el) {
    console.log("el",el)
    if (!el) {
      
      const centerModal = window.innerHeight > el.getBoundingClientRect().height

      // this.setState(
      //   {
      //     centerModal,
      //   },
      //   () => (el.parentNode.scrollTop = 0)
      // )
    }
  }

  render(){
    
    const { centerModal } = this.state
    const { showModal, closeModal, children, contentLabel } = this.props

    return(

      <div>
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          style={modalStyle}
          backdropStyle={backdropStyle}
          contentLabel={contentLabel}
        >
          <ModalContent
            centerModal={centerModal}
            innerRef={el => handleModalContentRef(el)}
          >
            {children}
            <div style={{height: '200vh'}}>asdasd</div>
            <Button onClick={closeModal}>chiudi </Button>
          </ModalContent>
        </Modal>
      </div>
    )
  }
}


const ModalContent = styled.div`
  margin: 0;
  background-color: white;
  position: relative;
  ${props =>
    props.centerModal
      ? `
      transform: translate(0,-50%);
      top: 50%;
    `
      : null} &:focus {
    outline: none;
  }

  &:after {
    content: '';
  }
  @media (min-width: 500px) {
    margin: 1.25rem;
  }

`

export default ModalOverlay