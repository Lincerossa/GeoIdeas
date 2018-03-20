import React from 'react'
import Modal from 'react-modal';
import styled from 'styled-components'
import Button from './Button'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    backgroundColor: 'black',
    transform: 'translate(-50%, -50%)'
  }
};


const ModalOverlay = ({ showModal, closeModal, children, contentLabel }) => (
  <div>
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={contentLabel}
    >
    {children}
    <Button onClick={closeModal}>chiudi </Button>
    </Modal>
  </div>
)
export default ModalOverlay