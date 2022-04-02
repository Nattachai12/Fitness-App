import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
// import fetch from "isomorphic-fetch";
import axios from "axios";
import FormInput from "./FormInput.jsx";
import "./../scss/login.scss";
// import userInfo from './global.js';

function Login({ userInput, email, password }) {
  const [error, setError] = useState({
    message: "",
    isError: false,
    redirect: false,
  });

  const onChange = (e) => {
    userInput(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = { email: email, password: password };
    axios
      .post("/api/getUser", values)
      .then((res) => {
        console.log(res);
        if (typeof res.data === "object" && !Array.isArray(res.data)) {
          setError({ ...error, redirect: true });
        } else {
          setError({ ...error, isError: true, message: res.data });
        }
      })
      .catch((err) => console.log(err));
  };

  if (error.redirect) {
    return <Navigate replace to="/home" />;
  }
  console.log(email, password);
  return (
    <div className="logInContent">
      <h1 className="loginHeader">Last Minute Workout Generator</h1>
      <div className="logInForm">
        <form onSubmit={handleSubmit}>
          <h1 className="loginHeader">Log In</h1>
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
          <div className="loginRoute">
            <button className="loginButton">Log In</button>
            <Link to={"/signup"}>
              <p>Sign Up</p>
            </Link>
          </div>
          {error.isError ? (
            <span className="submitError">{error.message}</span>
          ) : null}
        </form>
      </div>

      <div className="links">
        <Link to={"/home"}>
          <h1 className="link">home</h1>
        </Link>
        <Link to={"/createWorkout"}>
          <h1 className="link">createWorkout</h1>
        </Link>
      </div>
    </div>
  );
}

export default Login;
