import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetch from "isomorphic-fetch";
import FormInput from './FormInput.jsx';

function Login() {
  // const array = Array
  //click signup, endpoint is /
  //post request send to the backend
   const [values, setValues] = useState({
     email: "",
     password: "",
   });

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }
  console.log(values);
  return (
    <div className="LogInForm">
      <h1>Log In</h1>
      <form className="logInForm">
        <FormInput key='1' label="Email" onChange={onChange} placeholder="email" name='email' type='email'/>
        <FormInput key='2' label="Password" onChange={onChange} placeholder="password" name='password' type='password'/>
        <Link to='/home'>
        <button>Log In</button>
        </Link>
      </form>

      <Link to={"/signup"}>
        <h1>Sign Up</h1>
      </Link>
    </div>
  );
}

export default Login;
