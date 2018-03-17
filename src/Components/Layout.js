

import React from 'react'
import styled from 'styled-components'


const Layout = (props) => (
  <Container>
    <h3>header qui</h3>
    {props.children}
  </Container>
)
const Container = styled.div`
  border: 2px solid violet;
`



export default Layout