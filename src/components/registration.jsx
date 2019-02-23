import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { addUser } from "../services/userService";
import { toast } from "react-toastify";

class Registration extends Form {
  state = {
    data: {
      username: "",
      password: "",
      email: "",
      phone: "",
      firstname: "",
      lastname: ""
    },
    errors: {}
  };
  schema = {
    username: Joi.string()
      .required()
      .min(5)
      .max(30)
      .label("User Name"),
    firstname: Joi.string()
      .required()
      .min(3)
      .max(30)
      .label("First Name"),
    lastname: Joi.string()
      .required()
      .min(1)
      .max(30)
      .label("Last Name"),
    password: Joi.string()
      .min(3)
      .max(30)
      .required()
      .label("Password"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    phone: Joi.number()
      .required()
      .label("Mobile Phone")
  };

  doSubmit = async () => {
    try {
      await addUser(this.state.data);
      toast("Sucessfully created user '" + this.state.data.username + "'");
      //localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.history.push("/books");
    } catch (ex) {
      console.log(ex.response);
      if (ex.response && ex.response.status === 400) {
        const { data } = ex.response;
        const errors = { ...this.state.errors };
        errors.username = data.message;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Registration</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("firstname", "First Name")}
          {this.renderInput("lastname", "Last Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("phone", "Mobile Phone")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Registration;
