import React, { Component } from 'react';
import { FormErrors } from './TestFormErrors';
import {connect} from 'react-redux';

// import { Form, FormGroup, ControlLabel, FormControl, Button, Col} from 'react-bootstrap'
import {bindActionCreators} from 'redux';
import LoginAction from '../actions/LoginAction';



class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput = (e) => {                                  
    const name = e.target.name.trim();
    const value = e.target.value.trim();
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' Valid email required';
        break;
      // case 'password':
      //   passwordValid = value.length >= 6;
      //   fieldValidationErrors.password = passwordValid ? '': ' Password is too short';
      //   break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }


  handleSubmit(event){
    var fadeIn = document.getElementsByClassName('hidden')[0];
    fadeIn.classList.add('hidden');
    event.preventDefault();
    console.log("A LA TEST");


    const formData = {
       email : event.target[0].value,
       password : event.target[1].value,
      }
      
    this.props.loginAction(formData);
    console.log(formData);
  }


  componentWillReceiveProps(newProps){
  if(newProps.auth.msg === "wrongPassword"){
    this.setState({
      error: "This password does not match."
    });
  }else if(newProps.auth.msg === "badUsrMofo"){
    this.setState({
      error: "We do not have an account for this email address."
    })
  }else if(newProps.auth.msg === "successss"){
    // usr has logged in. Move them on
    newProps.history.push('/profile');
    }
  }




  render () {
    // console.log(this.props.auth);
    document.body.style.background = 'url("../images/clipboard.jpg") no-repeat center center fixed'
    document.body.style.backgroundSize = 'cover'
    if(this.props.auth.msg !== undefined && this.props.auth.msg === "badUsrMofo"){
      var fadeIn = document.getElementsByClassName('hidden')[0];
      fadeIn.classList.add('fadein');
    }
    
    return (
      <div className="container center">
      <div className="row">
      <div className="login-box z-depth-5 center slide2">
      
      <div className='col s12 title-head justify'>

      <h3>Login</h3>
      </div>
      
      <form className="col s12 login-form"  onSubmit={this.handleSubmit}>
        
        
        
          
        
          
          <div className="input-field">
              <i className="material-icons prefix icons">email</i>
          <input type="email" required className="form-control" name="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleUserInput}  />
            <FormErrors formErrors={this.state.formErrors.email} />
            </div>
          <div className="input-field">
              <i className="material-icons prefix icons">vpn_key</i>
          <input type="password" className="form-control" name="password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={this.handleUserInput}  />
            <FormErrors formErrors={this.state.formErrors.password} />
        </div>

     

        <button type="btn waves-effect waves-light" 
        id='login-button'
        className="btn btn-primary" disabled={!this.state.formValid}>Login!
        <i className="material-icons right">send</i>
        </button>
      </form>
      </div>
      </div>
      <h3 className="hidden slide">something went wrong - try again</h3>
      </div>
      


    )
  }
}


function mapStateToProps(state){
  return{
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    loginAction: LoginAction,
  }, dispatch);
}









export default connect(mapStateToProps,mapDispatchToProps)(Login);