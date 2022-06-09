import { icon } from '@fortawesome/fontawesome-svg-core';
import {  faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: "",
      confirmpassword: '',


      type: "password",
     
      icon: faEyeSlash,

      isError: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: '',
      }
    }

  }
  
  // // iconClick() {
  // //   // console.warn("ok");
  // //   // console.log(e);
   
  // //   if (this.state.type === "password") {
  // //     this.setState({
  // //       ...this.state,
  //      isPasswordShown: false,
  // //       icon: faEye,
  // //       type: "text",
       
  // //     })
  // //   } else {
  // //     this.setState({
  // //       ...this.state,
  // //       icon: faEyeSlash,
  // //       type: "password",
     
  // //     })
  // //   }
  // //   // console.log(this.state.type)
  // //  };
   state = {
     
  
    isPasswordShown: false,
    icon:faEye,
  };

  togglePasswordVisiblity = () => {
    
   
    const { isPasswordShown } = this.state;
   
    this.setState({ isPasswordShown: !isPasswordShown });
  };

state={
  isPasswordShown: false,

};
togglePasswordVisiblitys=()=>{
  const { isPasswordShowne} =this.state;
  this.setState({isPasswordShowne: !isPasswordShowne});
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
          value.length < 4 ? "Please enter the name" : '';
        break;
      case "email":
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        isError.email = pattern.test(value)
          ? ''
          : "Email address is invalid";
        break;
      case "phone":
        isError.phone = value.length < 10 ? " Please enter the number" : '';
        break;
       
      case "password":
        isError.password = value.length < 4 ? " Please enter the password" : '';
      
        break;
        case "confirmpassword":
      
          isError.confirmpassword=value.length < 4 ? "please enter the confirmpassword" :'' 
      default:
        break;
    }
    this.setState({
      isError,
      [name]: value
    })

  };
  submit=(e)=>{
   
  }
  render() {
    const { isError } = this.state;
    const { isPasswordShown } = this.state;
    const {isPasswordShowne}= this.state;
    return (


      <form onSubmit={this.onSubmit} noValidate>
        <h1 id="id">Shraddha<sub id="id1">Baheti</sub></h1>
        <p id="id2">Create an Account</p>
        <div className='from-group'>
          <label className="label" >Name</label>
          <input type="text"
            id="input"
            className={isError.name.length > 0 ? "is-invalid form-control" : "form-control"}
            name="name"
            value={this.state.name}
            onChange={this.formValChange}
            placeholder="    name" />

        </div>
        {isError.name.length > 0 && (
          <span className="invalid-feedback">{isError.name}</span>
        )}
        <div className='from-group'>
          <label className="label">Phone</label>
          <input type="number" id="input"
            name="phone"
            className={isError.phone.length > 0 ? "is-invaild form-control" : "form-control"}
            onChange={this.formValChange}
            value={this.state.phone}
            placeholder="    phoneNumber" ></input>

        </div>
        {isError.phone.length > 0 && (
          <span className="invalid-feedback">{isError.phone}</span>
        )}
        <div className='from-group'>
          <label className="label">  Email</label>
          <input type="text" id="input" name="email"
          value={this.state.email}
            className={isError.email.length > 0 ? "is-invaild form-control" : "form-control"}
            placeholder="      email"
            onChange={this.formValChange} />

        </div>
        {isError.email.length > 0 && (
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



            <div className='FontAwesomeIcon'   onClick={this.togglePasswordVisiblity} >
              <FontAwesomeIcon width="20" className='iconShow' icon={this.state.icon} />
            </div>

          </div>
          {isError.password.length > 0 && (
            <span className="invalid-feedback">{isError.password}</span>
          )}
        </div>
        <div className='from-group'>
          <div className='pass_icon'>
            <label className="label1">Confirm Password</label>
            <input type={isPasswordShowne ? "text" : "password"} id="input" name="confirmpassword" placeholder="    confirm password"
              className={isError.confirmpassword.length > 0 ? "is-invaild form-control" : "form-control"}
              
              onChange={this.formValChange}
            />
            <div className='FontAwesomeIcon'  onClick={this.togglePasswordVisiblitys}>
              <FontAwesomeIcon width="20" className='iconShow' icon={this.state.icon} />
            

            </div>
           </div>
          {isError.confirmpassword.length > 0 && (
            <span className="invalid-feedback">{isError.confirmpassword}</span>
          )}
         
        </div>

        <button className="btn" onClick={(e)=>this.submit(e)} type="submit">Submit</button>
      </form>
    )
  }
}

export default Registration;