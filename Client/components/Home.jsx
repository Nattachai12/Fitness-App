import React from "react";
import { Link, Navigate } from "react-router-dom";
import Nav from "./Nav.jsx";
import "./../scss/home.scss";

function Home() {
  const {user_id, username, birthday, email} = JSON.parse(window.localStorage.getItem("user"));
  return (
    <div className="homepage">
      <Nav username={username}></Nav>
      <div className="homeButtons">
        <Link to="/createWorkout">
          <button className="homeButton">Create Workout</button>
        </Link>
        <Link to="/calendar">
          <button className="homeButton">Calendar</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
