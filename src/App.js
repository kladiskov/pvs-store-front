import React, { Component } from "react";
import BookForm from "./components/bookForm";
import StoreNavBar from "./components/navBar";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Books from "./components/books";
import NotFound from "./components/common/notFound";
import Categories from "./components/categories";
import Registration from "./components/registration";
import Login from "./components/login";
import Logout from "./components/logout";
import auth from "./services/userService";
import SecureRoute from "./components/common/secureRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <StoreNavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <SecureRoute path="/books/:id" component={BookForm} />
            <Route
              path="/books"
              render={props => <Books {...props} user={user} />}
            />
            <Route path="/categories" component={Categories} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/books" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
