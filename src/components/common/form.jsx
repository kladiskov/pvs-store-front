import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = { data: {}, errors: {} };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  validateProperty = ({ name, value }) => {
    return "";
  };

  validate = () => {
    return "";
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <div className="form-group">
        <label htmlFor="title">{label}</label>
        <input
          className="form-control"
          type={type}
          name={name}
          value={data[name]}
          onChange={this.handleChange}
          error={errors[name]}
          id={data[name]}
        />
      </div>
    );
  }

  renderSelect(name, label, options, type = "text") {
    const { data, errors } = this.state;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          className="form-control"
          type={type}
          name={name}
          value={data[name]}
          onChange={this.handleChange}
          errors={errors}
        >
          {options.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }
}

export default Form;
