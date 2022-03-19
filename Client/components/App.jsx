import React from 'react';
import { Routes, Route } from "react-router-dom";
import LogIn from "./LogIn.jsx";
import Signup from './Signup.jsx';
// import Signup from "./Signup.jsx";

function App() {
  return (
    <div className="router">
      <Routes>
        <Route path="/" element={ <LogIn /> } />
        <Route path='/signup' element= { <Signup /> }/>
      </Routes>
    </div>
  );
}

export default App