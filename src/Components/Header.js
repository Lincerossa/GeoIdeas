import React from 'react'
import styled from 'styled-components'

const handleRouteChange = ({ history, url }) => {
  history.push(url)
}


const Header = ({history}) => (
  <Container>
    <LoginWrapper>

      <BackHome 
        onClick={() => handleRouteChange({ history, url: '/' })}
      >
        Home
      </BackHome>

      <Logo 
        onClick={() => handleRouteChange({ history, url: '/login' })}
      >
        Login
      </Logo>
    </LoginWrapper>
  </Container>
)

const Container = styled.div`
  height: 60px;
  border-bottom:${props => props.theme.colors.secondary};
  margin: 0;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.secondary};
`

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  text-transform: uppercase;
  letter-spacing: .1em;
  font-family: sans-serif;
`
const BackHome = styled.div`
  cursor: pointer;
`

const Logo = styled.div`
  cursor: pointer;
`


export default Header