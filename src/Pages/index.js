import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import GeoPosition from '../Containers/GeoPosition'
import Login from '../Containers/Login'

import Root from './Root'
import Map from './Map'

import withLayout from '../hoc/withLayout'


const Pages = () => (
  <Switch>
    <Route exact path='/' component={Root} />
    <Route exact path='/map' component={withLayout(Map)} />
    <Route path='/geoposition' component={withLayout(GeoPosition)} />
    <Route path='/login' component={withLayout(Login)} />
  </Switch>
)



export default withRouter(Pages)