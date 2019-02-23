import React, { Component } from "react";
import { Link } from "react-router-dom";
import user from "../services/userService";
class Logout extends Component {
  state = {};
  componentDidMount() {
    user.logout();
    window.location = "/";
  }
  state = {};
  render() {
    return (
      <div>
        <p>
          You have successfully logged out.<Link to="/login">Click here</Link>
          to login again.
        </p>
      </div>
    );
  }
}

export default Logout;
