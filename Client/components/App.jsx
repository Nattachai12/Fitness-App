import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../action/action.js";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import Calendar from "./calendar.jsx";
import CreateWorkout from "./createWorkout.jsx";

const mapStateToProps = (state) => ({
  username: state.users.username,
  email: state.users.email,
  birthday: state.users.birthday,
  password: state.users.password,
});

const mapDispatchToProps = (dispatch) => ({
  userInput: (e) => dispatch(actions.userInput(e)),
});

function App(props) {
  const [user, setUser] = useState({});
  console.log(props);
  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div className="router">
      <Routes>
        <Route
          path="/"
          element={
            <Login
              userInput={props.userInput}
              email={props.email}
              password={props.password}
            />
          }
        />
        <Route path="/home" element={<Home username={props.username} />} />
        <Route
          path="/signup"
          element={
            <Signup
              userInput={props.userInput}
              username={props.username}
              birthday={props.birthday}
              email={props.email}
              password={props.password}
            />
          }
        />
        <Route path="/createWorkout" element={<CreateWorkout />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
