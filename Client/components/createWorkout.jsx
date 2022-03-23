import React, { useState, useEffect } from "react";
import Nav from "./Nav.jsx";
import equipmentList from "./../equipmentList.js";
import Exercises from "./Exercises.jsx";
import "./../scss/createWorkout.scss";

const axios = require("axios").default;
/*
List by eqiupment
"bodyPart":"cardio"
"equipment":"stationary bike"
"gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/2138.gif"
"id":"2138"
"name":"stationary bike run v. 3"
"target":"cardiovascular system"
*/

function createWorkout() {
  //useState for the output of the data
  //axios get request to the api
  const { user_id, username, birthday, email } = JSON.parse(
    window.localStorage.getItem("user")
  );

  const [equipment, setEquipment] = useState("assisted");

  const [bodypart, setBodyPart] = useState({});

  const [isGetRes, setIsGetRes] = useState(false);

  // useEffect(() => {

  // }, [third])

  const handleChange = (e) => {
    setEquipment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: `https://exercisedb.p.rapidapi.com/exercises/equipment/${equipment}`,
      headers: {
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        "X-RapidAPI-Key": "c104b6a78bmsh1a2a4c576170f09p1b0d52jsn5102d178eb15",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        //create an obj that has bodyPart as key and empty array as result
        const obj = {
          back: [],
          cardio: [],
          chest: [],
          "lower arms": [],
          "lower legs": [],
          neck: [],
          shoulders: [],
          "upper arms": [],
          "upper legs": [],
          waist: [],
        };
        //iterate through response.data (array)
        for (const currentExercise of response.data) {
          obj[currentExercise.bodyPart].push(currentExercise);
        }
        setBodyPart(obj);
        setIsGetRes(true);
        //if response.data[i].bodyPart === ''
        //push it to useState
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const arr = [];
  if (isGetRes) {
    let uniqueKey = 1;
    for (const key in bodypart) {
      console.log("key: ", key);
      if (bodypart[key].length !== 0) {
        arr.push(
          <Exercises key={uniqueKey} name={key} exerciseList={bodypart[key]} />
        );
        uniqueKey++;
      }
    }
  }

  console.log("filterExercises: ", bodypart);
  return (
    <div className="createWorkoutPage">
      {/* Nav bar to go to either Calendar or home page */}
      <Nav username={username}></Nav>
      <form className="equitmentListForm" onSubmit={handleSubmit}>
        <label>
          Choose Equipment
          <select value={equipment} onChange={handleChange}>
            {equipmentList.map((equipment, i) => (
              <option key={i} value={equipment}>
                {equipment}
              </option>
            ))}
          </select>
        </label>
        <input type="submit" value="submit" />
      </form>
      <div className="exerciseList">{arr}</div>
    </div>
  );
}

export default createWorkout;
