import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./navBar.css";
const StoreNavBar = ({ user }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Link className="navbar-brand" to="/books">
        <i className="fa fa-graduation-cap" aria-hidden="true" />
        <span id="first"> pvs</span>
        <span id="second">book</span>
        <span id="third">store</span>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink className="nav-item nav-link" to="/books">
            <i className="fa fa-home" aria-hidden="true" />
            Home
          </NavLink>
          <NavLink className="nav-item nav-link" to="/books">
            <i className="fa fa-ticket" aria-hidden="true" />
            Top Picks
          </NavLink>
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                <i className="fa fa-sign-in" aria-hidden="true" />
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                <i className="fa fa-user-plus" aria-hidden="true" />
                Register
              </NavLink>
              <NavLink className="nav-item nav-link" to="/cart">
                <i className="fa fa-shopping-cart" aria-hidden="true" />
                Cart
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavDropdown title={user.name} id="user-items">
                <NavDropdown.Item href="/profile">My Account</NavDropdown.Item>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
              <NavLink className="nav-item nav-link" to="/register">
                <i class="fa fa-shopping-cart" aria-hidden="true" />
                Cart
              </NavLink>
            </React.Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default StoreNavBar;
