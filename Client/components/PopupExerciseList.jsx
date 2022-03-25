import React from "react";

function PopupExerciseList({
  exercise,
  setCheck,
  check,
  setSaveExercises,
  saveExercises,
}) {
  const handleCheckOnChange = (e) => {
    if (check[exercise.bodyPart] === true) {
      setCheck({ ...check, [exercise.bodyPart]: false });
      setSaveExercises({ ...saveExercises, [e.target.name]: "" });
    } else {
      setCheck({ ...check, [exercise.bodyPart]: true });
      setSaveExercises({ ...saveExercises, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="PopupExerciseList">
      <label>
        <input
          type="checkbox"
          value={exercise.name}
          checked={check[exercise.bodyPart]}
          name={exercise.bodyPart}
          key={exercise.bodyPart}
          onChange={handleCheckOnChange}
        />
        {exercise.name}
      </label>
    </div>
  );
}

export default PopupExerciseList;
