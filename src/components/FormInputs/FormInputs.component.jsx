import React from "react";
import { useState } from "react";
import TimePicker from "../../utils/TimePicker";
import "./FormInputs.styles.css";

const FormInput = ({ label, icon = null, method, ...otherProps }) => {
  return (
    <div className="inputContainer">
      <div>{label}</div>

      {method === "time" ? (
        <div className="time">
          <TimePicker name="time" {...otherProps} /> {icon}
        </div>
      ) :(
        <div className={`input ${method==='date'? 'date':''}`}>
          <input {...otherProps} /> {icon}
        </div>
        
      )}
    </div>
  );
};

export default FormInput;
