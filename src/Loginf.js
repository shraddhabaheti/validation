import './App.css';
import { useState, useEffect } from 'react';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Loginf() {
  const [state, setState] = useState({
    email: "",
    password: '',
    icon: faEyeSlash,
    icon: faEye,
    type: "password",
    isPasswordShown: false,
    loading: false


  })
  const [error, setError] = useState({
    email: "",
    password: '',

  })
  const navigate = useNavigate();
  const togglePasswordVisiblity = () => {

    const { isPasswordShown } = state;

    setState({ ...state, isPasswordShown: !isPasswordShown });
  };

  const handleChanges = (e) => {
    let name = e.target.name;
    let value = e.target.value;

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
    setState({
      ...state,
      [name]: value
    });
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
    setState({
      ...state,
      [name]: value
    });

  }
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!state.email || !state.password) {

        let error = {};

        if (!state.email) {
          error.email = "please enter the email"
          setError(error)
        }
        if (!state.password) {
          error.password = "please enter the password"
          setError(error)
        }

      } else {
        const { email, password } = state
        let inputData = {

          email: email,
          password: password,


        }
        setState({
          loading: true
        })

        let response = await fetch('http://192.168.1.6:4000/users/login', {
          method: "post",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json'
          },
          body: JSON.stringify(inputData)
        
        });


        let user = await response.json();
        localStorage.setItem("token", user.data.token);

        setTimeout(() => {
          setState({
            loading: false

          })
        }, 2000)


        if (response.status === 500) {

          toast.error(user.message)
          setTimeout(() => {
          navigate('/home')
          }, 2000)

        }
        if (response.status === 200) {

          toast.success(user.message)
          //navigate('/login')
          setTimeout(() => {
           navigate('/home')
          }, 2000)

        }
        if (response.status === 400) {
          toast.error(user.message)
          setTimeout(() => {
            navigate('/home')
          }, 2000)

        }

      }



    } catch (error) {
      setState({
        error,
        loading: false,



      })

    };


  }



  return (
    <div>
      <form onSubmit={onSubmit} noValidate >

        <h1 id="id">Shraddha<sub id="id1">Baheti</sub></h1>
        <p className="label3">Welcome Back !</p>
        <div className='from-group'>
          <label className="label" >Email</label>
          <input type="text" id="input" name="email" placeholder="email" className={`form-control ${error.name && "is-invalid"}`} value={state.email} onChange={(e) => { handleChanges(e) }} />
        </div>
        {error?.email &&
          <span className="invalid-feedback">{error.email}</span>
        }
        <div className='form-group'>
          <label className="label2">Password</label>

          <input type={state.isPasswordShown ? "text" : "password"} id="input" name="password" placeholder="    password" className={`form-control ${error.name && "is-invalid"}`} value={state.password} onChange={(e) => { handleChanges(e) }} />
          <div className='FontAwesomeIcon4' onClick={() => { togglePasswordVisiblity() }} >
            <FontAwesomeIcon width="20" className='iconShow' icon={state.isPasswordShown ? faEye : faEyeSlash} />
          </div>

        </div>
        {error?.password &&
          <span className="invalid-feedback">{error.password}</span>
        }
        <button className="btn" onClick={(e) => { onSubmit(e) }} type="submit">
          {state.loading ? <CircularProgress disableShrink /> : "Submit"}
          <ToastContainer />
        </button>

      </form>
    </div>
  )
}
export default Loginf;