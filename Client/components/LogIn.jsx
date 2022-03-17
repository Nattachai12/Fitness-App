import React, {useState, useEffect} from 'react';
import fetch from "isomorphic-fetch";

function LogIn() {

  const [leaders, setLeaders] = useState(null);

  useEffect(() => {
        fetch("/api/leaders")
      .then((response) => response.json())
      .then((leaders) => setLeaders(leaders));
  }, []);

  if (!leaders) return null;
  const leaderNames = leaders.map((leader) => (
    <li key={leader.id}>{leader.name}</li>
  ));

  return (
    <div>
      Login
      <form method="POST" action="/login">
        <input name="username" type="text" placeholder="username"></input>
        <input
          name="password"
          type="password"
          placeholder={leaders[0].name}
        ></input>
        <input type="submit" value="login"></input>
      </form>
      <a href="./signup">Sign up</a>
    </div>
  );
}

export default LogIn;