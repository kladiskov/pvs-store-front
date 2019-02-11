import React, { Component } from "react";
import BookForm from "./components/bookForm";
import NavBar from "./components/navBar";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Books from "./components/books";
import NotFound from "./components/common/notFound";
import Categories from "./components/categories";
import Registration from "./components/registration";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/register" component={Registration} />
            <Route path="/books/:id" component={BookForm} />
            <Route path="/books" component={Books} />
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
