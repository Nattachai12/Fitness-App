import React, { useState } from "react";

function Exercises({ name, exerciseList }) {
  //exerciseList is an array of obj that looks like this
  /*
"bodyPart":"cardio"
"equipment":"stationary bike"
"gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/2138.gif"
"id":"2138"
"name":"stationary bike run v. 3"
"target":"cardiovascular system"
  */
  const [change, setChange] = useState(0);

  const handleClick = (e) => {
    e.preventDefault();
    const random = Math.floor(Math.random() * exerciseList.length);
    setChange(random);
  };
  //pick one random exercises from the list
  const random = Math.floor(Math.random() * exerciseList.length);
  const exercise = exerciseList[change]; //exercise is an obj
  return (
    <div className="exercises">
      <h3 className="exerciseName">{name}</h3>
      <ul>
        <li>{exercise.name}</li>
        <img src={exercise.gifUrl} alt="nothing" />
      </ul>
      <button onClick={handleClick}>change</button>
    </div>
  );
}

export default Exercises;
