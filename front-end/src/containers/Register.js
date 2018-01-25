import React, { Component } from 'react';
// import {Form, FormGroup, ControlLabel, FormControl, Button, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Autosuggest from 'react-autosuggest';
// import Insurance from './Insurance';
import { FormErrors } from './TestFormErrors';
import RegisterAction from '../actions/RegisterAction';
import Insurance from '../components/Insurance'

import "./Register.css";


// const insurance = Insurance;
// console.log(insurance);

class Register extends Component{
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      phone: '',
      formErrors: {email: '', password: '', phone: '', zipcode: ''},
      emailValid: false,
      passwordValid: false,
      phoneValid: false,
      zipcodeValid: false,
      formValid: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUserInput = (event) => {                                                                    
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let phoneValid = this.state.phoneValid;
    let zipcodeValid = this.state.zipcodeValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Email address is invalid';
        break;
      case 'password':
        passwordValid = (value.length >= 6);
        fieldValidationErrors.password = passwordValid ? '': 'Password is too short';
        break;
      case 'phone':
        phoneValid = (value.length === 10);
        fieldValidationErrors.phone = phoneValid ? '': 'Phone # must be 10 digit number';
        break;
      case 'zipcode':
        zipcodeValid = (value.length === 5);
        fieldValidationErrors.zipcode = zipcodeValid ? '': ' Zip must be 5 digit number';
        break; 

      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    phoneValid: phoneValid,
                    zipcodeValid: zipcodeValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.phoneValid && this.state.zipcodeValid,
                   emailValid:this.state.emailValid 
                    });
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }


  handleSubmit(event){
    event.preventDefault();
    console.log("handleSubmit fired up");
    var formData = {
       name : event.target[0].value,
       email : event.target[1].value,
       password : event.target[2].value,
       insuranceType : event.target[3].value,
       street: event.target[4].value,
       city : event.target[5].value,
       state : event.target[6].value,
       zipcode: event.target[7].value,
       phoneNumber : event.target[8].value,

    }
    console.log(formData);
    this.props.registerAction(formData);
  };


  componentWillReceiveProps(newProps){
    console.log(newProps);
  // if(newProps.auth.msg === "wrongPassword"){
  //   this.setState({
  //     error: "This password does not match."
  //   });
  // }else if(newProps.auth.msg === "badUser"){
  //   this.setState({
  //     error: "We do not have an account for this email address."
  //   })
  // }else 
    if(newProps.auth.msg === "success"){
    // usr has logged in. Move them on
    newProps.history.push('/login');
    }else if(newProps.auth.msg === "alreadin"){
      this.seState({
        error: "This email has been registered already. Try again"
      });
    }
  }


  render(){
    document.body.style.background = 'url("../images/clipboard.jpg") no-repeat center center fixed'
    document.body.style.backgroundSize = 'cover'

  return(
        <div className = "register">
        <div className ="register-wrapper z-depth-5 slide">
        <h3 className="center">Register</h3>
            

         <form  className='col s12 register-form z-depth-5' onSubmit={this.handleSubmit}>
          
                <div className='row'>

               
               <div className="input-field col s12">
               <i className="material-icons prefix icons">account_circle</i>
               <input type="text"  name="name"
                    id="name" 
                    className="active validate"
                    
                    value={this.state.name}
                    onChange={this.handleUserInput}  />
                    <label id="label-name" htmlFor="name">Name</label>
                    </div>

              
              <div className="input-field col s12">
              <i className="material-icons prefix icons">email</i>
              <input type="email"  name="email"
                id="register-email"
               className="active validate"
                value={this.state.email}
                onChange={this.handleUserInput}  />
                <FormErrors formErrors={this.state.formErrors.email} />
                <label id="label-email" htmlFor="register-email">Email Address</label>
                </div>

              
              <div className="input-field col s12">
              <i className="material-icons prefix icons">vpn_key</i>
               <label id="label-password" htmlFor="register-password">Password</label>
              <input type="password" name="password"
                id="register-password"
                value={this.state.password}
                onChange={this.handleUserInput}  />
                </div>
               
                <FormErrors formErrors={this.state.formErrors.password} />

              
              <div className="input-field col s12">
              <i className="material-icons prefix icons">code</i>
              <label id="label-insurance" htmlFor="insurance">Insurance</label>
              <Insurance id="insurance" />

                </div>

                <div className="input-field col s12">
              <i className="material-icons prefix icons">code</i>
              <input type="text"  name="street"
                id="register-street"
                value={this.state.street}
                onChange={this.handleUserInput}  />
                <label id="label-street" htmlFor="register-street">Street Address</label>
                </div>
              
              <div className="input-field col s12">
              <i className="material-icons prefix icons">code</i>
              <input type="text"  name="city"
                id="register-city"
                value={this.state.city}
                onChange={this.handleUserInput}  />
                <label id="label-city" htmlFor="register-city">City</label>
                </div>

              
              <div className="input-field col s12">
              <i className="material-icons prefix icons">code</i>
              <input type="text" name="state"
              id="register-state"
                
                value={this.state.state}
                onChange={this.handleUserInput}  />
                <label id="label-state" htmlFor="register-state">State</label>
                </div>

              
              <div className="input-field col s12">
              <i className="material-icons prefix icons">code</i>
              <input type="number" name="zipcode"
              id="register-zipcode"
                
                value={this.state.zipcode}
                onChange={this.handleUserInput}  /> 
                <label id="label-zipcode" htmlFor="register-zipcode">Zipcode</label> 
                </div>
                <FormErrors formErrors={this.state.formErrors.zipcode} />

              
              <div className="input-field col s12">
              <i className="material-icons prefix icons">phone</i>
              <input type="number" name="phone"
                id="register-phone"
                value={this.state.phone}
                onChange={this.handleUserInput}  />
                <label id="label-phone" htmlFor="register-phone">Phone</label>
                </div>
                <FormErrors formErrors={this.state.formErrors.phone} />
        <button type="submit" className="btn waves-effect waves-light"

        disabled={!this.state.formValid}>Register!
        <i className="material-icons right">send</i></button>
                </div>
            </form>
            </div>
        </div>


      
    );
  }
}

function mapStateToProps(state){
  return{
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    registerAction: RegisterAction,
  }, dispatch);
}








export default connect(mapStateToProps,mapDispatchToProps)(Register);