import './App.css';
import {useState} from 'react';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import { CircularProgress } from '@mui/material';


import axios from 'axios';

function Reg(){
    const[state,setState]=useState({
        name:'',
        phone:'',
        email:'',
        password:'',
        confirmpassword:'',
        icon: faEyeSlash,
        icon: faEye,
        type:"password",
        isPasswordShown: false,
        isPasswordShowne:false,
  
        
    })
    // console.log(state);
    const [error ,setError]=useState({
        name:"",
        email:"",
        phone:"",
        password:'',
        confirmpassword:"",
    })

    // let togglePasswordVisiblity = ()=>{
    //     // console.log('okoko');
    //     if(state.type === "password"){
    //         setState({
    //           ...state,
    //           icon:faEye,
    //           type:"text"
    //         })
    //       }else{
    //         setState({
    //           ...state,
    //           icon:faEyeSlash,
    //           type:"password"
    //         })
    //       }
    // }
  const  togglePasswordVisiblity = () => {

        const { isPasswordShown } = state;
    
        setState({...state, isPasswordShown: !isPasswordShown });
      };
    
    
     const  togglePasswordVisiblitys = () => {
        const {isPasswordShowne } = state;
        setState({...state, isPasswordShowne: !isPasswordShowne });
      };
    const handleChange=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        
        if (name === "name") {
          if (value.length < 3) {
            setError({
              ...error,
              [name]: "please  enter 3 character "
            })
          } else {
            setError({
              ...error,
              [name]: ""
            })
          }
    
        }
        setState({
          ...state,
          [name]: value
        });
        if (name === "phone") {
          if (value.length < 10) {
            setError({
              ...error,
              [name]: "please enter the 10  digits number "
            })
          } else {
            setError({
              ...error,
              [name]: ""
            })
          }
    
        }
        setState({
          ...state,
          [name]: value
        });
    
        if (name === "email") {
    
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(value)) {
    
            // ["email"] = "Please enter valid email address.";
            setError({
              ...error,
              [name]: "please enter the email address ."
            })
          }
          else {
            setError({
              ...error,
              [name]: ""
            })
          }
        }
        if (name === "password") {
            var password_pattern = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/);
          if (!password_pattern.test(value))
            setError({
              ...error,
              [name]: "please enter strong password uppercase and lowercase number specialCharacter."
            })
          else {
            setError({
              ...error,
              [name]: ""
            })
    
          }
    
        }
        if (name === "confirmpassword") {
          if (value.length < 3)
            setError({
              ...error,
              [name]: "Confirm password is required."
            })
          else {
            setError({
              ...error,
              [name]: ""
            })
          }
    
        }
    
        if (state.password && name === "confirmpassword") {
    
          if (state.password !== value) {
            setError({
              ...error,
              [name]: " password not a match...!"
            })
          
          } else {
            setError({
              ...error,
              [name]: ""
            })
    
          }
        }
    
      
    
      

    }
   const onSubmit=(e)=>{
        if (!state.name || !state.email || !state.phone || state.password !== state.confirmpassword || state.phone.length < 10 || !state.password || !state.confirmpassword) {
    
            e.preventDefault()
            let error={};
            if (state.password !== state.confirmpassword) {

                error.confirmpassword = "password and confirm password are not matched";
        
            }
            if(!state.name){
                error.name=" Please enter the name"
                setError(error)
            }
            if(!state.phone){
                error.phone="please enter the phone"
                setError(error)
            }
            if(!state.email){
                error.email="please enter the email"
                setError(error)
            }
            if(!state.password){
                error.password="please enter the password"
                setError(error)
            }
            if(!state.confirmpassword){
                error.confirmpassword="please enter the confirme password"
                setError(error)
            }
        }else{

         
        }
    }

    return(
      
        <div>
        
            <form onSubmit={()=>{onSubmit()}} noValidate >
            <h1 id="id">Shraddha<sub id="id1">Baheti</sub></h1>
            <p id="id2">Create an Account</p>
            <div className='from-group'>
               <label className="label" >Name</label>
          <input type="text" id="input"  name="name"  placeholder="    name"   className={`form-control ${error.name && "is-invalid"}`}  value={state.name} onChange={(e)=>{handleChange(e)}}/>
            </div>
            {error?.name &&
          <span className="invalid-feedback">{error.name}</span>
        }
        <div className='from-group'>
          <label className="label" >phone</label>
          <input type="number" id="input"  name="phone"  placeholder="    phone"   className={`form-control ${error.name && "is-invalid"}`} value={state.phone} onChange={(e)=>{handleChange(e)}}/>
          </div>
          {error?.phone &&
          <span className="invalid-feedback">{error.phone}</span>
        }
           <div className='from-group'>
          <label className="label" >Email</label>
          <input type="text" id="input"  name="email"  placeholder="    email"    className={`form-control ${error.name && "is-invalid"}`}  value={state.email} onChange={(e)=>{handleChange(e)}} />
          </div>
          {error?.email &&
          <span className="invalid-feedback">{error.email}</span>
        }
          <div className='form-group'>
          <label className="label2">Password</label>

       <input  type={state.isPasswordShown ? "text" : "password"} id="input" name="password" placeholder="    password"     className={`form-control ${error.name && "is-invalid"}`}  value={state.password} onChange={(e)=>{handleChange(e)}}/>
        <div className='FontAwesomeIcon2' onClick={()=>{togglePasswordVisiblity()}} >
              <FontAwesomeIcon width="20" className='iconShow' icon={state.isPasswordShown ? faEye : faEyeSlash} />
        </div> 

       </div>
       {error?.password &&
          <span className="invalid-feedback">{error.password}</span>
        }
        <div className='form-group'>

      
       <label className="label1">Confirm Password</label>
            <input type={state.isPasswordShown ? "text" : "password"} id="input" name="confirmpassword" placeholder="    confirm password"  className="inputs"  value={state.confirmpassword} onChange={(e)=>{handleChange(e)}}/>
           
            <div className='FontAwesomeIcon3' onClick={()=>{togglePasswordVisiblitys()}} >
              <FontAwesomeIcon width="20" className='iconShow' icon={state.isPasswordShowne ? faEye : faEyeSlash} />
            </div>

            </div>
            {error?.confirmpassword &&
          <span className="invalid-feedback">{error.confirmpassword}</span>
        }
            <button className="btn" onClick={(e)=>{onSubmit(e)}}  type="submit">Submit</button>
            </form>
     
           </div>

    )
   

}
export default Reg;