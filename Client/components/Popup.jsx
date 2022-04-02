import React, { useState } from "react";
import PopupExerciseList from "./PopupExerciseList.jsx";
import fetch from "isomorphic-fetch";
import "./../scss/popup.scss";

function Popup({ setPopup, displayExercise }) {
  const [check, setCheck] = useState({
    back: false,
    cardio: false,
    chest: false,
    "lower arms": false,
    "lower legs": false,
    neck: false,
    shoulders: false,
    "upper arms": false,
    "upper legs": false,
    waist: false,
  });

  const [saveExercises, setSaveExercises] = useState({
    routineName: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/saveExercise", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(saveExercises),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data; ", data);
      })
      .catch((err) => console.log(err));
  };

  const handleRoutineName = (e) => {
    setSaveExercises({ ...saveExercises, [e.target.name]: e.target.value });
  };

  const arr = [];
  for (const key in displayExercise) {
    if (displayExercise[key] !== undefined) {
      arr.push(
        <PopupExerciseList
          saveExercises={saveExercises}
          setSaveExercises={setSaveExercises}
          exercise={displayExercise[key]}
          setCheck={setCheck}
          check={check}
        />
      );
    }
  }
  console.log(saveExercises);
  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <h2>Create Routine</h2>
        <button className="popup__closeButton" onClick={() => setPopup(false)}>
          X
        </button>
        <label>
          Routine:
          <input
            type="text"
            name="routineName"
            placeholder="Routine Name"
            onChange={handleRoutineName}
          />
        </label>
        {arr}
        <input type="submit" value="save" />
      </form>
    </div>
  );
}

export default Popup;
