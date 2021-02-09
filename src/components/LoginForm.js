import React from 'react'
import { connect } from 'react-redux';
import { loginSuccess } from '../actions/auth'
import { Form, Input, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css' 

class LoginForm extends React.Component {
    constructor(){
        super()

        this.state = {
            email: 'denaweiss5@gmail.com',
            password: 'dena',
            error: ''
        }
    }



  handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleSubmit = (e) => {
      e.preventDefault()

      const reqObj = {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body:  JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })
      }
      fetch("http://localhost:3000/auth", reqObj)
      .then(resp => resp.json())
      .then(data => {
          if (data.error){
              this.setState({
                  error: data.error
              })
          } else {
              localStorage.setItem('jwt_token', data.jwt_token)
              /// store token in local storage- store of memory that persists across refreshes
              this.props.loginSuccess(data.user)
              this.props.history.push('/home')
          }
      })
  }


  render(){
    return(
      <div >
      { this.state.error ? <h4 style={{color: 'red'}}>{this.state.error}</h4> : null}
      <Form  className='loginform' widths='equal' onSubmit={this.handleSubmit}>
        <h1>Sign in</h1>
        <br></br>
       <Form.Field required>
        <label>Email</label>
        <Input 
        name='email' 
        placeholder='Email'
        value={this.state.email}
        onChange={this.handleChange} 
        />
        </Form.Field>
        <Form.Field required>
        <label>Password</label>
        <Input 
        type='password'
        name='password' 
        placeholder='Password'
        value={this.state.password}
        onChange={this.handleChange}
        />
        </Form.Field>
        <Form.Button content='Sign In' />
    </Form>
    </div>
   )
  }
}




const mapDispatchToProps = {
    loginSuccess: loginSuccess
}


export default connect(null, mapDispatchToProps)(LoginForm);