import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import user from "../services/userService";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
class Login extends Form {
  state = { data: { username: "", password: "" }, errors: {} };
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
      .label("Password")
  };

  doSubmit = async () => {
    const { data } = this.state;
    try {
      await user.login(data);
      toast(
        "Authentication was successful for '" + this.state.data.username + "'"
      );
      const { state } = this.props.location;
      //this.props.history.push("/books");
      //window.location = "/"; //need a full refresh of the dom to set the current user
      window.location = state ? state.from.pathname : "/"; //get the redirect link from the previous page, if it is available.
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 400 || ex.response.status === 401)
      ) {
        const { data } = ex.response;
        const errors = { ...this.state.errors };
        errors.password = data.message;
        this.setState({ errors });
      }
    }
  };

  render() {
    console.log(user.getCurrentUser());
    if (user.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
