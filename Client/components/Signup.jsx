import React, { useState, useEffect } from "react";
// import pic from './../../Gif/Animhorse.gif';
import { Link, Navigate } from "react-router-dom";
import FormInput from "./FormInput.jsx";
import axios from 'axios';

function Signup({ userInput, username, email, birthday, password }) {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });
  //for backend to send result back
  const [nameError, setNameError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should contain between 3-16 characters and should not contain any special characters",
      label: "Username",
      //regex to show when will the error message appear
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Should be a valid email",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 characters",
      label: "Password",
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "ConfirmPassword",
      errorMessage: "Passwords don't match",
      label: "ConfirmPassword",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users", values)
      .then((res) => {
        console.log(res.data);
        if (typeof res.data === "boolean") {
          setRedirect(true);
        } else {
          setNameError(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const onChange = (e) => {
    // using [] for an obj key will allow us to send the value of the variable as a key
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  if (redirect) {
    return <Navigate replace to="/"></Navigate>;
  }

  return (
    <div className="formPage">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h1 className="formHeader">Register</h1>
          {inputs.map((input) => (
            <FormInput key={input.id} {...input} onChange={onChange} />
          ))}
          <button className="formButton">Submit</button>
          {nameError ? <span className="submitError">{nameError}</span> : null}
        </form>
      </div>
    </div>
  );
}

export default Signup;
