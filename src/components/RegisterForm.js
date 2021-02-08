import React from 'react'
import { connect } from 'react-redux';
import { createUser } from '../actions/users'
import { Form, Input } from 'semantic-ui-react'

class RegisterForm extends React.Component {
    constructor(){
        super()

        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
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
              name: this.state.name,
              password: this.state.password
            })
      }
      fetch("http://localhost:3000/users", reqObj)
      .then(resp => resp.json())
      .then(newUser => {
          if (newUser.error){
              this.setState({
                  error: newUser.error
              })
          } else {
              this.props.createUser(newUser)
              this.props.history.push('/home')
          }
      })
  }


  render(){
    return(
      <div>
      { this.state.error ? <h4 style={{color: 'red'}}>{this.state.error}</h4> : null }
      <Form  className='registerform' widths='equal' onSubmit={this.handleSubmit}>
        <h1>Register</h1>
        <br></br>
        <Form.Field required>
        <label>Name</label>
        <Input 
        name='name' 
        placeholder='Name'
        value={this.state.name}
        onChange={this.handleChange} 
        />
        </Form.Field>
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
        name='password' 
        placeholder='Password'
        value={this.state.password}
        onChange={this.handleChange}
        />
        </Form.Field>
        <Form.Field required>
        <label>Password confirmation</label>
        <Input 
        name='passwordConfirmation'
        placeholder='Password confirmation'
        value={this.state.passwordConfirmation}
        onChange={this.handleChange}
        />
        </Form.Field>
        <Form.Button content='Create account' />
    </Form>
    </div>
   )
  }
}




const mapDispatchToProps = {
    createUser: createUser
}


export default connect(null, mapDispatchToProps)(RegisterForm);