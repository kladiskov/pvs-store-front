import React from "react";
import { Link, NavLink } from "react-router-dom";
const NavBar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        PVS Store
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/books">
            Home
          </NavLink>
          <NavLink className="nav-item nav-link" to="/categories">
            Categories
          </NavLink>
          <NavLink className="nav-item nav-link" to="/books">
            Pricing
          </NavLink>
          <NavLink className="nav-item nav-link disabled" to="/book">
            Disabled
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;