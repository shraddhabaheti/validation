import { icon } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import { CircularProgress } from '@mui/material';

import axios from 'axios';

import { CellWifi, CleaningServices } from '@mui/icons-material';
import { toast } from 'react-toastify';
class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: "",
      confirmpassword: "",
      isPasswordShown: false,
      loading: false,


      type: "password",

      icon: faEyeSlash,
      icon: faEye,

      isError: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: '',


      }


    }

  }


  //  iconClick() {
  // //   // console.warn("ok");
  // //   // console.log(e);

  //   if (this.state.type === "password") {
  //     this.setState({
  //       ...this.state,
  // isPasswordShown: false,
  //       icon: faEye,
  //       type: "text",

  //     })
  //   } else {
  //     this.setState({
  //       ...this.state,
  //       icon: faEyeSlash,
  //       type: "password",

  //     })
  //   }
  //   // console.log(this.state.type)
  //  };
  // state = {



  //   icon: faEye,
  // };




  togglePasswordVisiblity = () => {


    const { isPasswordShown } = this.state;

    this.setState({ isPasswordShown: !isPasswordShown });
  };


  togglePasswordVisiblitys = () => {
    const { isPasswordShowne } = this.state;
    this.setState({ isPasswordShowne: !isPasswordShowne });
  };

  formValChange = e => {
    //console.log(e.target.value);
    //console.log(e.target.name);
    e.preventDefault();
    const { name, value } = e.target;
    let isError = { ...this.state.isError };


    switch (name) {
      case "name":

        isError.name =
          value.length < 3 ? "Please enter the name 3 character" : '';

        break;
      case "email":

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        isError.email = pattern.test(value)
          ? ''
          : "Email address is invalid";
        break;
      case "phone":
        isError.phone = value.length !== 10 ? " Please enter  the 10 digits  number" : '';
        break;
      case "password":
        var password_pattern = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/);
        ;
        isError.password = password_pattern.test(value)
          ? ''
          : "please enter strong password uppercase and lowercase number specialCharacter";
        // isError.password = value.length < 4 ? " Please enter the password" : '';
        break;
      // case "confirmpassword":
      //   isError.confirmpassword = value.length < 4 ? " Please enter the confirmpassword" : '';
      //   break;
      case "confirmpassword":

        //  isError.confirmpassword= value.length < 4 ? " Please enter the confirmpassword" : '';
        if (this.state.password !== e.target.value) {

          isError.confirmpassword = "password not match..!"
        } else {

          isError.confirmpassword = ""
        }
      // isError.confirmpassword = ""
      default:
        break;

    }
    this.setState({
      ...this.state,
      isError,
      [name]: value
    })
  };
  submit = (e) => {
    e.preventDefault();
    //let isError = {};


    if (!this.state.name || !this.state.email || !this.state.phone || this.state.password !== this.state.confirmpassword || this.state.phone.length < 10 || !this.state.password || !this.state.confirmpassword) {
      let isError = {};


      if (this.state.password !== this.state.confirmpassword) {

        isError.confirmpassword = "password and confirm password are not matched";

      }

      if (!this.state.name) {
        isError.name = "please enter the name";


      }
      if (!this.state.phone) {
        isError.phone = "please enter the phone";
        // isError.phone = "please enter the phone";

      }
      if (!this.state.email) {
        isError.email = "please enter the email";
      }
      if (!this.state.password) {

        isError.password = "please enter the password";
      }
      if (!this.state.confirmpassword) {

        isError.confirmpassword = "please enter the confirmpassword";
      }



      // if (this.state.password !== this.state.confirmpassword) {
      //     debugger
      //   isError.confirmpassword = "password not match..!"
      // }
      this.setState({ isError })
     
    } else {

      const { name, phone, email, password } = this.state
      let inputData = {
        name: name,
        phone: Number(phone),
        email: email,
        password: password,


      }
      //console.log(inputData);
       this.setState({
         loading: true


       })
      axios.post(`https://fa53-122-177-225-67.in.ngrok.io/users/register`, inputData)
      .then(res => {
        console.log(res);
        console.log(res.data);

        this.setState({
          loading :false
        })
      }).catch(error=>
        this.setState({
          error,
          loading :false
          
        }))

     
    
    
     
  };
}
  // if (!this.state.name|| ) {
  //   isError.name = "please enter the name";
  //   this.setState({ isError })

  //   //console.log(isError.name);
  //  if (!this.state.phone) {
  //     isError.phone = "please enter the phone";
  //     //console.log(isError.phone);
  //   }
  //  if (!this.state.email) {
  //     isError.email = "please enter the email";

  //   }
  // if (!this.state.password) {
  //     isError.password = "please enter the password";
  //   }
  //   if (!this.state.confirmpassword) {
  //     isError.confirmpassword = "please enter the confirmpassword";

  //   }
  //  if(this.state.password !== this.state.confirmpassword){
  //     isError.password="please dont match"
  //   }




  render() {
    const { isError } = this.state;

    const { isPasswordShown } = this.state;
    const { isPasswordShowne } = this.state;
    return (


      <form onSubmit={this.onSubmit} noValidate>
        <h1 id="id">Shraddha<sub id="id1">Baheti</sub></h1>
        <p id="id2">Create an Account</p>
        <div className='from-group'>
          <label className="label" >Name</label>
          <input type="text"
            id="input"
            className={`form-control ${isError.name && "is-invalid"}`}
            // className={isError.name.length > 0 ? "is-invalid form-control" : "form-control"}
            name="name"
            value={this.state.name}
            onChange={this.formValChange}
            placeholder="    name" />

        </div>
        {isError?.name &&
          <span className="invalid-feedback">{isError.name}</span>
        }
        {/* <span className="invalid-feedback">{isError.name.length > 0 && isError.name}</span>  */}


        <div className='from-group'>
          <label className="label">Phone</label>
          <input type="number" id="input"
            name="phone"
            className={`form-control ${isError.name && "is-invalid"}`}

            // className={isError.phone.length > 0 ? "is-invaild form-control" : "form-control"}
            onChange={this.formValChange}
            value={this.state.phone}
            placeholder="  phoneNumber" ></input>

        </div>
        {isError?.phone && (
          <span className="invalid-feedback">{isError.phone}</span>
        )}
        {/* <span className="invalid-feedback">{isError.phone.length > 0 && isError.phone}</span>  */}
        <div className='from-group'>
          <label className="label">  Email</label>
          <input type="text" id="input" name="email"
            value={this.state.email}
            className={`form-control ${isError.email && "is-invalid"}`}

            //className={isError.email.length > 0 ? "is-invaild form-control" : "form-control"}
            placeholder="      email"
            onChange={this.formValChange} />

        </div>
        {isError?.email && (
          <span className="invalid-feedback">{isError.email}</span>
        )}
        {/* <span className="invalid-feedback">{isError.email.length > 0 && isError.email}</span>  */}
        <div className='from-group'>
          <div className='pass_icon'>
            <label className="label2">Password</label>

            <input type={isPasswordShown ? "text" : "password"}
              id="input" name="password" placeholder="    password"
              value={this.state.password}
              className={`form-control ${isError.password && "is-invalid"}`}

              //className={isError.password.length > 0 ? "is-invaild form-control" : "form-control"}
              onChange={this.formValChange}
            />



            <div className='FontAwesomeIcon' onClick={this.togglePasswordVisiblity} >
              <FontAwesomeIcon width="20" className='iconShow' icon={isPasswordShown ? faEye : faEyeSlash} />
            </div>

          </div>
          {isError?.password && (
            <span className="invalid-feedback">{isError.password}</span>
          )}
          {/* <span className="invalid-feedback">{isError.password.length > 0 && isError.password}</span>   */}
        </div>
        <div className='from-group'>
          <div className='pass_icon'>
            <label className="label1">Confirm Password</label>
            <input type={isPasswordShowne ? "text" : "password"} id="input" name="confirmpassword" placeholder="    confirm password"
              //className={isError.confirmpassword.length > 0 ? "is-invaild form-control" : "form-control"}
              className={`form-control ${isError.confirmpassword && "is-invalid"}`}

              onChange={this.formValChange}
            />
            <div className='FontAwesomeIcon' onClick={this.togglePasswordVisiblitys}>
              <FontAwesomeIcon width="20" className='iconShow'
                icon={isPasswordShowne ? faEye : faEyeSlash}
              />


            </div>
          </div>
          {isError?.confirmpassword && (
            <span className="invalid-feedback">{isError.confirmpassword}</span>
          )}
          {/* <span className="invalid-feedback">{isError.confirmpassword.length > 0 && isError.confirmpassword}</span>  */}

        </div>

        <button className="btn" onClick={(e) => this.submit(e)} type="submit"  >
          {this.state.loading ? <CircularProgress disableShrink /> : "Submit"}



        </button>


      </form>
    )
  }
}

export default Registration;