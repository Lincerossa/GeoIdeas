import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as actions from '../redux/actions/toggleSidebar'

import FormMarker from './FormMarker'
import { Sidebar } from '../Components'

const MapSidebar = ({ sidebar, toggleSidebar }) => (
  <Sidebar isActive={sidebar && sidebar == 'bookmark'} onClick={toggleSidebar}>
    <SidebarHeader>Sezione inserimento</SidebarHeader>
    <FormContainer>
      <FormMarker />
    </FormContainer>
  </Sidebar>
)



const FormContainer = styled.div`
  border: 1px solid ${props => props.theme.colors.secondary};
`

const SidebarHeader = styled.div`
  font-size: 1rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: .1em;
  margin-bottom: 1rem;
`


const mapStateToProps = (state) => ({
  sidebar: state.sidebar,
})


export default connect(
  mapStateToProps,
  actions,
)(MapSidebar)
