

import React from 'react'
import styled from 'styled-components'

import Header from './Header'



const Layout = (props) => (
  <Container>
    <Header />
    {props.children}
  </Container>
)

const Container = styled.div`
  border: 2px solid violet;
  position: relative;
  min-height: 100vh;
`


export default Layout