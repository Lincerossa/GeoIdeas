
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Loading from '../Components/Loading'

import * as actions from "../redux/actions/getGeoPosition";



class Root extends Component {

  constructor(props) {
    super(props)
    this.handleBeginClick = this.handleBeginClick.bind(this)
  }


  handleBeginClick() {
    const { getGeoPosition } = this.props
    getGeoPosition()
  }

  render() {
    const { geoPosition } = this.props

    geoPosition.lat = 33
    geoPosition.lng = 44

    if (geoPosition.lat && geoPosition.lng) {
      this.props.history.push('/map');
    }

    return (
      <Container>
        { geoPosition.loading && <Loading /> }
        <BeginContainer onClick={this.handleBeginClick}>
          <div className="material-icons">location_searching</div>
        </BeginContainer>

      </Container>
    )
  }

}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: rgba(black, .5);
  align-items: center;
  background: ${ props => props.theme.colors.third};
  justify-content: center;
`

const BeginContainer= styled.div`
  border-radius: 50%;
  border: 1px solid ${ props => props.theme.colors.main};
  color:  ${ props => props.theme.colors.main};
  background-color:  ${ props => props.theme.colors.secondary};
  cursor: pointer;
  transition: .3s all;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  &:hover{
    border: 1px solid ${ props => props.theme.colors.secondary};
    color:  ${ props => props.theme.colors.secondary};
    background-color:  ${ props => props.theme.colors.main};
    animation: pulsate .8s ease-out;
    animation-iteration-count: infinite;
  }



  @keyframes pulsate {
    0% {
      transform: scale(1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1.3);
      opacity: 0;
    }
  }

  .material-icons{
    font-size: 50px
  }
`


const mapStateToProps = (state) => ({
  geoPosition: state.geoPosition,
})


export default connect(
  mapStateToProps,
  actions,
)(Root)
