import React, { useState, useEffect } from "react";
// import pic from './../../Gif/Animhorse.gif';
import { Link, Navigate } from "react-router-dom";
import fetch from "isomorphic-fetch";
import FormInput from "./FormInput.jsx";

function Signup() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });
  //for backend to send result back
  const [nameError ,setNameError] = useState('');
  const [redirect, setRedirect] = useState(false);


  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username should contain between 3-16 characters and should not contain any special characters",
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

  //function for onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(values),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (typeof data === 'boolean') {
            setRedirect(true);
          } else {
          setNameError(data);
          }
        })
        .catch((err) => console.log(err));
  };

  const onChange = (e) => {
    // using [] for an obj key will allow us to send the value of the variable as a key
    setValues({...values, [e.target.name]: e.target.value});
  }
  if (redirect) {
    return <Navigate replace to='/'></Navigate>
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

// const userInput = (init) => {
//   const [value, setValue] = useState(init);
//   const onChange = (e) => {
//     setValue(e.target.value);
//   };
//   // console.log('value: ', value);
//   // return the value with the onChange function instead of setValue function
//   return [value, onChange];
// };

// function Signup() {
//   const findUser = (e) => {
//     e.preventDefault();
//     //  check if name is empty
//     if (userName === "") {
//       setNameError("required");
//     } else if (password === "") {
//       setPsswordError("required");
//     } else {
//       const body = { username: userName, password: password };
//       fetch("/api/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "Application/JSON",
//         },
//         body: JSON.stringify(body),
//       })
//         .then((resp) => resp.json())
//         .then((data) => {
//           setNameError(data);
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   const [userName, setUsername] = userInput("");
//   const [password, setPassword] = userInput("");
//   const [nameError, setNameError] = useState(null);
//   const [passwordError, setPasswordError] = useState(null);
//   console.log(userName, password);
//   return (
//     <div className="app">
//       Signup
//       <form>
//         <input
//           name="username"
//           type="text"
//           placeholder="username"
//           value={userName}
//           onChange={setUsername}
//         ></input>
//         {nameError ? <span className="errorMsg">{nameError}</span> : null}
//         <input
//           name="password"
//           type="text"
//           placeholder={"password"}
//           value={password}
//           onChange={setPassword}
//         ></input>
//         <Link to={"/"}>
//           <input type="submit" value="sign up" onClick={findUser}></input>
//         </Link>
//       </form>
//       <Link to={"/"}>
//         <a>Log In</a>
//       </Link>
//     </div>
//   );
// }
