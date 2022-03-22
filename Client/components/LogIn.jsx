import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import fetch from "isomorphic-fetch";
import FormInput from './FormInput.jsx';
// import userInfo from './global.js';

function Login({setUser}) {
  // const array = Array
  //click signup, endpoint is /
  //post request send to the backend
   const [values, setValues] = useState({
     email: "",
     password: "",
   });

   const [error, setError] = useState({message: '', isError: false, redirect: false});

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(values),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (typeof data === 'object' && !Array.isArray(data)) {
          setUser(data);
          setError({...error, redirect: true});
        } else {
          setError({...error, isError: true, message: data, });
        }
      })
      .catch((err) => console.log(err));
  };

  if(error.redirect) {
    return <Navigate replace to="/home" />;
  }

  console.log(values);
  return (
    <div className="LogInForm">
      <h1>Log In</h1>
      <form className="logInForm" onSubmit={handleSubmit}>
        <FormInput
          key="1"
          label="Email"
          onChange={onChange}
          placeholder="email"
          name="email"
          type="email"
          autoComplete="on"
        />
        <FormInput
          key="2"
          label="Password"
          onChange={onChange}
          placeholder="password"
          name="password"
          type="password"
        />
        {/* <Link to='/home'> */}
        <button>Log In</button>
        {/* </Link> */}
        {error.isError ? (
          <span className="submitError">{error.message}</span>
        ) : null}
      </form>

      <Link to={"/signup"}>
        <h1>Sign Up</h1>
      </Link>
      <Link to={'/home'}>
        <h1>home</h1>
      </Link>
    </div>
  );
}

export default Login;
