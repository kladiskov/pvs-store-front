import React from "react";
const Input = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.title}</label>
      <input type={props.type} name={props.name} className="form-control" />
    </div>
  );
};

export default Input;
