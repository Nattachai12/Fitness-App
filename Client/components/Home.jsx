import React from "react";
import Nav from "./Nav.jsx";

function Home({ user }) {
  console.log('user:', user)
  console.log('window.localStorage: ', window.localStorage.getItem('user'));
  return (
    <div className="homepage">
      <Nav {...user}></Nav>
      <div>{window.localStorage.getItem('user')}</div>
    </div>
  );
}

export default Home;
