import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { addUser } from "../services/userService";
import { toast } from "react-toastify";

class Registration extends Form {
  state = {
    data: { username: "", password: "", email: "", mobile: "" },
    errors: {}
  };
  schema = {
    username: Joi.string()
      .required()
      .min(5)
      .max(30)
      .label("User Name"),
    password: Joi.string()
      .min(3)
      .max(30)
      .required()
      .label("Password"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    mobile: Joi.number()
      .required()
      .label("Mobile Phone")
  };

  mapToData() {
    const data = this.state.data;
    return {
      userName: data.username,
      emailId: data.email,
      phoneNumber: data.mobile
    };
  }

  doSubmit = async () => {
    try {
      const data = this.mapToData();
      console.log(data);
      await addUser(data);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("User already exists.");
      }
    }
    this.props.history.push("/books");
  };

  render() {
    return (
      <div>
        <h1>Registration</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("email", "Email")}
          {this.renderInput("mobile", "Mobile")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Registration;
