import React,  { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../Redux/Actions/handleLogin'



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

  
  render() {

    const { login } = this.props
    const { value } = this.state
    return(


      <Container>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Input type="text" value={value} onChange={e => this.handleChange(e.target.value)}   />
          <input type="submit" />
          {
            login.userAlreadyRegistered && login.userChecked && <p>utente già registrato. lo blocco e gli chiedo password</p>
          }
          {
            !login.userAlreadyRegistered && login.userChecked &&
            <Link to="/test">vai avanti</Link>
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
`

const Form = styled.form`
`
const Input = styled.input`
`

const mapStateToProps = (state) => ({
  login: state.login
})

export default connect(
  mapStateToProps,
  actions,
)(Login)
