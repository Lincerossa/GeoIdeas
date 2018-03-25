import React from 'react'
import styled from 'styled-components'


const Sidebar = ({ children, isActive, onClick }) => (
  <Container isActive={isActive}>
    {children}
    <Icon
      onClick={() => onClick(null)}
      className="material-icons"
    >account_circle</Icon>
  </Container>
)

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right:0;
  width: 300px;
  background: ${props => props.theme.colors.main};
  transform: ${props => props.isActive ? 'none' : 'translate(100%,0)'};
  z-index: 1;
  padding: 1rem;
  color: white;
  transition: .4s ease-in-out;
`

const Icon = styled.div`
  border: ${props => props.theme.colors.main};
`

export default Sidebar