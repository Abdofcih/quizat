import React from "react";
import "./FormRow.css";
const FormRow = ({ type, name, value, handleChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
