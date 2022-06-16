import React, { Component } from "react";
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {WithRouter} from '../src/WithRouter'
import { CircularProgress } from '@mui/material';
class Login extends Component {
  constructor() {
    super();
    this.state = {
       email: '',
       password: '',
       loding: false,
      isPasswordShown: false,
      type: "password",
      icon: faEyeSlash,
      icon: faEye,
      isError: {
        email: '',
        password: '',
      }
    }
  }
  formValChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = { ...this.state.isError };
    switch (name) {
      case "email":
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        isError.email = pattern.test(value)
          ? ''
          : "Email address is invalid";
        break;
      case "password":
        var password_pattern = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/);
        ;
        isError.password = password_pattern.test(value)
          ? ''
          : "please enter strong password uppercase and lowercase number specialCharacter";
        //isError.password = value.length < 4 ? " Please enter the password upercase and lower case" : '';
        break;
      default:
        break;
    }
    this.setState({
      isError,
      [name]: value
    })
  };

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  submit = (e) => {
    e.preventDefault();
    let isError = {};
    if (!this.state.email || !this.state.password) {
      if (!this.state.email) {
        isError.email = "please enter the email";
        this.setState({ isError });
      }
      if (!this.state.password) {
        isError.password = "please enter the password";
      }
    }
    else {
      const { email, password } = this.state
     let inputData = {
           email: email,
           password: password
           }
       this.setState({
        loading: true
      })
     axios.post(`http://192.168.1.6:4000/users/login`, inputData)
        .then(res => {
          localStorage.setItem("token", res.data.data.token);
          console.log(res);
          console.log(res.data);
          this.props.navigate('/homes')
        })
     };
     
 }
  render() {
    const { isError } = this.state;
    const { isPasswordShown } = this.state;

    return (
      <form onSubmit={this.onSubmit} noValidate>

        <h1 id="id">Shraddha<sub id="id1">Baheti</sub></h1>
        <p className="label3">Welcome Back !</p>
        <div className='from-group'>
          <label className="label">  Email</label>
              <input type="text" id="input" name="email"
               value={this.state.email}
                className={isError.email.length > 0 ? "is-invaild form-control" : "form-control"}
               placeholder="      email"
               onChange={this.formValChange} />
        </div>
        {isError?.email && (
          <span className="invalid-feedback">{isError.email}</span>
        )}
 <div className='from-group'>
          <div className='pass_icon'>
             <label className="label2">Password</label>

             <input type={isPasswordShown ? "text" : "password"}
              id="input" name="password" placeholder="    password"
              value={this.state.password}
              className={isError.password.length > 0 ? "is-invaild form-control" : "form-control"}
              onChange={this.formValChange}
            />
    <div className='FontAwesomeIcon' onClick={this.togglePasswordVisiblity} >
              <FontAwesomeIcon width="20" className='iconShow' icon={isPasswordShown ? faEye : faEyeSlash} />
            </div>
    </div>
          {isError?.password && (
            <span className="invalid-feedback">{isError.password}</span>
          )}
        </div>
        <button className="btn" type="submit" onClick={(e) => this.submit(e)}>
          {this.state.loding ? <CircularProgress disableShrink /> : " Sign In"}
        </button> 
        </form>
    )

  }
}
export default WithRouter(Login);