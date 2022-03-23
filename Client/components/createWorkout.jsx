import React, { useState } from "react";
import Nav from "./Nav.jsx";

function createWorkout() {
  //useState for the output of the data
  //axios get request to the api
  const { user_id, username, birthday, email } = JSON.parse(
    window.localStorage.getItem("user")
  );

  const [equipment, setEquipment] = useState("assisted");
  const options = [
    "assisted",
    "band",
    "barbell",
    "body weight",
    "bosu ball",
    "cable",
    "dumbbell",
    "elliptical machine",
    "ez barbell",
    "hammer",
    "kettlebell",
    "leverage machine",
    "medicine ball",
    "olympic barbell",
    "resistance band",
    "roller",
    "rope",
    "skierg machine",
    "sled machine",
    "smith machine",
    "stability ball",
    "stationary bike",
    "stepmill machine",
    "tire",
    "trap bar",
    "upper body ergometer",
    "weighted",
    "wheel roller",
  ];

  const handleChange = (e) => {
    setEquipment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(equipment);
  }
  console.log(equipment);
  return (
    <div className="createWorkoutPage">
      {/* Nav bar to go to either Calendar or home page */}
      <Nav username={username}></Nav>
      <form className="equitmentListForm" onSubmit={handleSubmit}>
        <label>
          Choose Equipment
          <select value={equipment} onChange={handleChange}>
            {options.map((equipment, i) => (
              <option key={i} value={equipment}>{equipment}</option>
            ))}
          </select>
        </label>
        <input type="submit" value='submit' />
      </form>
      {/* Create workout from user input */}
    </div>
  );
}

export default createWorkout;
