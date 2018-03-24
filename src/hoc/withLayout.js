import React from 'react'
import styled from 'styled-components'

import { Header } from '../Components'

const withLayout = WrappedComponents => props => (
  <Container>
    <Header {...props} />
      <Content>
        <WrappedComponents {...props} />
      </Content>
  </Container>
)


const Container = styled.div`
  position: relative;
  min-height: 100vh;
`

const Content = styled.div`
  padding-top: 60px;
`

export default withLayout