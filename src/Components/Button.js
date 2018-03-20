

import React from 'react'
import styled from 'styled-components'

const Button = ({ onClick, children }) => (
  <Wrapper onClick={onClick}>
    { children }
  </Wrapper>
)



const Wrapper = styled.button`
  outline: none;
  -webkit-appearance: none;
  border: none;
  font-size: 1rem;
  padding: 1rem;
  margin: 0;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: .1em;
  border: 2px solid black;
  cursor: pointer;
  background: white;
  transition: .3s all;
`


export default Button