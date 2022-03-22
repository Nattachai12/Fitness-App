import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";


function App() {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    window.localStorage.setItem('user', JSON.stringify(user));
  }, [user]);


  console.log('user: ', user);
  return (
    <div className="router">
      <Routes>
        <Route path="/" element={<Login setUser={setUser}/>} />
        <Route path="/home" element={<Home user={user}/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
