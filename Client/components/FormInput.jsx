import React, { useState } from "react";
import "./../scss/formInput.scss";

function FormInput({ errorMessage, label, onChange, ...inputProps }) {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        // onBlur = executed this function after this input tag loses focus
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span className="formError">{errorMessage}</span>
    </div>
  );
}

export default FormInput;
