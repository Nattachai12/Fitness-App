import React from "react";
import { Link } from "react-router-dom";
import './../scss/nav.scss';

function Nav({ username }) {
  return (
    <div className="Nav">
      <Link to="/calendar">
        <h1>Calendar</h1>
      </Link>
      <Link to="/createWorkout">
        <h1>workout</h1>
      </Link>
      <h1>{username}</h1>
    </div>
  );
}

export default Nav;
