import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import Calendar from "./calendar.jsx";
import CreateWorkout from "./createWorkout.jsx";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    window.localStorage.setItem('user', JSON.stringify(user));
  }, [user]);


  console.log('user: ', user);
  return (
    <div className="router">
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createWorkout" element={<CreateWorkout />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </div>
  );
}

export default App;
