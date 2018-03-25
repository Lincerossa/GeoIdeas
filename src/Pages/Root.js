
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Loading, Button } from '../Components'

import * as actions from "../redux/actions/getGeoPosition";

const handleBeginClick = (getGeoPosition) => {
  getGeoPosition()
}

const Root = ({ geoPosition, history, getGeoPosition }) => {


  geoPosition.lat = 12
  geoPosition.lng = 32
  
  if (geoPosition.lat && geoPosition.lng) {
    history.push('/map');
  }

  return(

    <Container>
      {geoPosition.loading && <Loading />}
      <Button onClick={() => handleBeginClick(getGeoPosition)}>
        Geolocalizzami
      </Button>

    </Container>
  )
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

const mapStateToProps = (state) => ({
  geoPosition: state.geoPosition,
})


export default connect(
  mapStateToProps,
  actions,
)(Root)
