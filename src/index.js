import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './redux/storeConfig'
import Pages from './Pages'
import theme from './theme'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Pages/>
      </Router>
    </ThemeProvider>
  </Provider>, 
  window.document.getElementById("root")
)