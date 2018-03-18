import React,  { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as actions from '../Redux/Actions/handleLogin'
import { withRouter } from 'react-router-dom'

import Input from '../Components/Input'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      login: props.login,
      value: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  

  handleSubmit(e){
    e.preventDefault()

    const { handleLogin } = this.props
    const { value } = this.state

    if(value) {
      handleLogin(value)
    }

  }

  handleChange(value) {
    this.setState({
      value,
    })
  }

  
  componentWillReceiveProps(nextProps) {
    const { login } = nextProps
    const { history } = this.props
    if (login && login.userChecked && !login.userAlreadyRegistered ) {
      history.push('/test')
      return false
    }

  }  
  render() {

    const { login } = this.props
    const { value } = this.state
    return(


      <Container>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Input 
            type="text" 
            value={value} 
            label="Inserisci il tuo username"
            handleChange={this.handleChange}
          />
          {
            login.userAlreadyRegistered && 
            login.userChecked && 
            <p>utente già registrato. lo blocco e gli chiedo password</p>
          }
        </Form>
      </Container>


    )
  
  }

}

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

const Form = styled.form`
  width: 100%;
`


const mapStateToProps = (state) => ({
  login: state.login
})

export default connect(
  mapStateToProps,
  actions,
)(withRouter(Login))
