import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/userService";
const SecureRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      //path={path} //this can be remove as {...rest} will have it.
      {...rest}
      render={props => {
        console.log(props);
        if (!auth.getCurrentUser()) return <Redirect to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default SecureRoute;
