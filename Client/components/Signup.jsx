import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetch from "isomorphic-fetch";


function Signup() {
  // const array = Array
  //click signup, endpoint is /
  //post request send to the backend
  return (
    <div>
      <Link to={"/"}>
        <h1>Log In</h1>
      </Link>
    </div>
  );
}

export default Signup