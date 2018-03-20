

import React from 'react'
import styled from 'styled-components'

import Header from './Header'



const Layout = (props) => (
  <Container>
    <Header />
    <Content>
      {props.children}
    </Content>
  </Container>
)

const Container = styled.div`
  border: 2px solid violet;
  position: relative;
  min-height: 100vh;
`

const Content = styled.div`
  padding-top: 60px;
`

export default Layout