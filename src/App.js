import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'


import GeoPosition from './Containers/GeoPosition'
import Login from './Containers/Login'
import Layout from './Components/Layout'


import withLayout from './hoc/withLayout'


const App = () => (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/map' component={withLayout(GeoPosition)} />
  </Switch>
)



export default App