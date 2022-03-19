import React, {useState, useEffect} from 'react';
// import pic from './../../Gif/Animhorse.gif';
import { Link } from 'react-router-dom';
import fetch from "isomorphic-fetch";

const userInput = init => {
  const [ value, setValue ] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  };
  // console.log('value: ', value);
  // return the value with the onChange function instead of setValue function
  return [ value, onChange ];
}




function LogIn() {

 const findUser = (e) => {
  e.preventDefault();
  //  check if name is empty
  if (userName === '') {
    setNameError('required');
  } else if(password === ''){
    setPsswordError('required');
  } else {
  const body = {username: userName, password: password};
  fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((data) => {
      setNameError(data);
    })
    .catch(err => console.log(err))
  }
 };


  const [userName, setUsername] = userInput('');
  const [password, setPassword] = userInput('');
  const [ nameError, setNameError ] = useState(null);
  const [ passwordError, setPasswordError ] = useState(null);
  console.log(userName, password);
  return (
    <div>
      Signup
      <form>
        <input
          name="username"
          type="text"
          placeholder="username"
          value={userName}
          onChange={setUsername}
        ></input>
        {nameError ? <span className="errorMsg">{nameError}</span> : null}
        <input
          name="password"
          type="text"
          placeholder={"password"}
          value={password}
          onChange={setPassword}
        ></input>
        <input type="submit" value="sign up" onClick={findUser}></input>
      </form>
      <Link to={"/signup"}>
        <a>Log In</a>
      </Link>
    </div>
  );
}

export default LogIn;