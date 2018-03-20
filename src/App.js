import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import GeoPosition from './Containers/GeoPosition'
import GuestLogin from './Containers/GuestLogin'
import Map from './Containers/Map'
import Layout from './Components/Layout'


import withLayout from './hoc/withLayout'


const App = () => (
  <Switch>
    <Route exact path='/' component={withLayout(Map)} />
    <Route path='/geoposition' component={withLayout(GeoPosition)} />
    <Route path='/guestlogin' component={withLayout(GuestLogin)} />
  </Switch>
)



export default withRouter(App)