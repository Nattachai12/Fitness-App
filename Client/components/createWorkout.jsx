import React, { useState, useEffect } from "react";
import Nav from "./Nav.jsx";
import equipmentList from "./../equipmentList.js";
import Exercises from "./Exercises.jsx";
import Popup from "./Popup.jsx";
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

  const [bodypart, setBodyPart] = useState({
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
  });

  const [isGetRes, setIsGetRes] = useState(false);

  const [popup, setPopup] = useState(false);

  const [displayExercise, setDisplayExercise] = useState({
    back: "",
    cardio: "",
    chest: "",
    "lower arms": "",
    "lower legs": "",
    neck: "",
    shoulders: "",
    "upper arms": "",
    "upper legs": "",
    waist: "",
  });

  // useEffect(() => {

  // }, [third])

  const handleChange = (e) => {
    setEquipment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGetRes(false);
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
        const objFordisplayExercise = {};
        //iterate through response.data (array)
        for (const currentExercise of response.data) {
          obj[currentExercise.bodyPart].push(currentExercise);
        }
        setBodyPart(obj);
        setIsGetRes(true);
        for (const key in obj) {
          objFordisplayExercise[key] = obj[key][0];
        }
        setDisplayExercise(objFordisplayExercise);
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
      if (bodypart[key].length !== 0) {
        arr.push(
          <Exercises
            key={uniqueKey}
            name={key}
            displayExercise={displayExercise}
            setDisplayExercise={setDisplayExercise}
            exerciseList={bodypart[key]}
          />
        );
        uniqueKey++;
      }
    }
  }

  // console.log("displayExercise: ", displayExercise);
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
      {isGetRes ? (
        <input
          type="submit"
          value="create routine"
          onClick={() => setPopup((prev) => !prev)}
        />
      ) : null}
      {popup ? (
        <Popup setPopup={setPopup} displayExercise={displayExercise} />
      ) : null}
    </div>
  );
}

export default createWorkout;
