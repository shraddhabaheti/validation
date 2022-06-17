import './Regstration.css';
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


function Reg() {
  const [state, setState] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmpassword: '',
    icon: faEyeSlash,
    icon: faEye,
    type: "password",
    isPasswordShown: false,
    isPasswordShowne: false,
    loading:false


  })
  // console.log(state);
  const [error, setError] = useState({
    name: "",
    email: "",
    phone: "",
    password: '',
    confirmpassword: "",
  })
  const navigate=useNavigate();
  //const [data, setData] = useState([])

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
  const togglePasswordVisiblity = () => {

    const { isPasswordShown } = state;

    setState({ ...state, isPasswordShown: !isPasswordShown });
  };


  const togglePasswordVisiblitys = () => {
    const { isPasswordShowne } = state;
    setState({ ...state, isPasswordShowne: !isPasswordShowne });
  };
  const handleChange = (e) => {
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
  const onSubmit = async (e) => {
    e.preventDefault()
    try {


      if (!state.name || !state.email || !state.phone || state.password !== state.confirmpassword || state.phone.length < 10 || !state.password || !state.confirmpassword) {

        let error = {};
        if (state.password !== state.confirmpassword) {

          error.confirmpassword = "password and confirm password are not matched";

        }
        if (!state.name) {
          error.name = " Please enter the name"
          setError(error)
        }
        if (!state.phone) {
          error.phone = "please enter the phone"
          setError(error)
        }
        if (!state.email) {
          error.email = "please enter the email"
          setError(error)
        }
        if (!state.password) {
          error.password = "please enter the password"
          setError(error)
        }
        if (!state.confirmpassword) {
          error.confirmpassword = "please enter the confirme password"
          setError(error)
        }
      } else {
        const { name, phone, email, password } = state
        let inputData = {
          name: name,
          phone: Number(phone),
          email: email,
          password: password,


        }
        setState({
          loading:true
        })

        let response = await fetch('http://192.168.1.6:4000/users/register', {
          method: "post",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json'
          },
          body: JSON.stringify(inputData)
        });


        let user = await response.json();
      
          setTimeout(()=>{
            setState({
              loading:false
              
            })
          },2000)
       
      
        if(response.status === 500){
          
          toast.error(user.message)
          setTimeout(()=>{
            navigate('/login')
           },2000)
          
        }
        if(response.status === 200){
      
          toast.success(user.message)
         //navigate('/login')
         setTimeout(()=>{
          navigate('/login')
         },2000)
        
        }
        if( response.status===400){
          toast.error(user.message)
          setTimeout(()=>{
            navigate('/login')
           },2000)
          
        }
       
      }
     


    } catch (error) {
      setState({
        error,
        loading:false,
     
        
        
      })
    
    };
    //navigate('/login')
   
  }
 

    // const name =async() =>   {
    //   try{
    //     const res=  await axios.post('https://41b1-122-177-225-67.in.ngrok.io/users/register')

    //     console.log(res.data)
    //     setData(res?.data?.data)
    //   }catch(err){
    //     console.log(err)
    //   }

    // }         
    // name()  
  
  // useEffect(()=>{
  //   const name =async() =>   {
  //     try{
  //       const res=  await axios.post('https://41b1-122-177-225-67.in.ngrok.io/users/register')
  
  //       console.log(res.data)
  //       setData(res?.data?.data)
  //     }catch(err){
  //       console.log(err)
  //     }

  //   }         
  //   name()
  // },[]);
  //     //   const{name,email,phone,password}=state;
  // const inputData={
  //     name:name,
  //     email:email,
  //     phone:phone,
  //     password:password


  // }
  //     function  fetchFunction () {
  //         try{
  //                 const response = await fetch(`https://41b1-122-177-225-67.in.ngrok.io/users/register`,inputData);
  //           const json = await response.json();
  //         }
  //         catch(err) {
  //           throw err;
  //           console.log(err);

  //         }
  //       }
  //       fetchFunction()
  // }

  console.log("error",error)
  return (
  
    <div>
  
      <form onSubmit={onSubmit} noValidate >
        <h1 id="id">Shraddha<sub id="id1">Baheti</sub></h1>
        <p id="id2">Create an Account</p>
        <div className='from-group'>
          <label className="labels" >Name</label>
          <input type="text" id="input1" name="name" placeholder="name" className={`form-control ${error.name && "is-invalid"}`} value={state.name} onChange={(e) => { handleChange(e) }} />
        </div>
        {error?.name &&
          <span className="invalid-feedback">{error.name}</span>
        }
        <div className='from-group'>
          <label className="labels" >phone</label>
          <input type="number" id="input1" name="phone" placeholder="phone" className={`form-control ${error.name && "is-invalid"}`} value={state.phone} onChange={(e) => { handleChange(e) }} />
        </div>
        {error?.phone &&
          <span className="invalid-feedback">{error.phone}</span>
        }
        <div className='from-group'>
          <label className="labels" >Email</label>
          <input type="text" id="input1" name="email" placeholder="    email" className={`form-control ${error.name && "is-invalid"}`} value={state.email} onChange={(e) => { handleChange(e) }} />
        </div>
        {error?.email &&
          <span className="invalid-feedback">{error.email}</span>
        }
        <div className='form-group'>
          <label className="labels">Password</label>

          <input type={state.isPasswordShown ? "text" : "password"} id="input1" name="password" placeholder="    password" className={`form-control ${error.name && "is-invalid"}`} value={state.password} onChange={(e) => { handleChange(e) }} />
          <div className='FontAwesomeIcon2' onClick={() => { togglePasswordVisiblity() }} >
            <FontAwesomeIcon width="20" className='iconShow' icon={state.isPasswordShown ? faEye : faEyeSlash} />
          </div>

        </div>
        {error?.password &&
          <span className="invalid-feedback">{error.password}</span>
        }
        <div className='form-group'>


          <label className="labels">Confirm Password</label>
          <input type={state.isPasswordShowne ? "text" : "password"} id="input1" name="confirmpassword" placeholder="    confirm password" className="inputs" value={state.confirmpassword} onChange={(e) => { handleChange(e) }} />

          <div className='FontAwesomeIcon3' onClick={() => { togglePasswordVisiblitys() }} >
            <FontAwesomeIcon width="20" className='iconShow' icon={state.isPasswordShowne ? faEye : faEyeSlash} />
          </div>

        </div>
        {error?.confirmpassword &&
          <span className="invalid-feedback">{error.confirmpassword}</span>
        }
        <button className="btn4" onClick={(e) => { onSubmit(e) }} type="submit">
           {state.loading ? <CircularProgress disableShrink /> : "Submit"}
           <ToastContainer />
      </button>
    
      </form>

    </div>

  )


}
export default Reg;