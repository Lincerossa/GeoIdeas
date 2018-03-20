import React from 'react'
import styled from 'styled-components'

import { withRouter } from 'react-router-dom'

const handleRouteChange = ({ history, url }) => {
  history.push(url)
}


const Header = (props) => (
  <Container>
    <LoginWrapper>
      <BackHome onClick={() => handleRouteChange({ history: props.history, url: '/' })}>
        Home
      </BackHome>


      <Logo onClick={() => handleRouteChange({ history: props.history, url: '/guestlogin' })}>
      Login
      </Logo>
    </LoginWrapper>
  </Container>
)

const Container = styled.div`
  height: 60px;
  border: 1px solid grey;
  margin: 0;
  display: flex;
`

const LoginWrapper = styled.div`
  border: 1px solid grey;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const BackHome = styled.div`
  border: 1px solid yellow;
  cursor: pointer;
`

const Logo = styled.div`
  border: 1px solid blue;
  cursor: pointer;
`


export default withRouter(Header)