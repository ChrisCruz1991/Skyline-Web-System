import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="header">
    <nav className="header__navigation">
      <div className="header__home">
        <Link to="/">Mech-2-Tech</Link>
      </div>
      <div className="header__navigation-items">
        <ul>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/vehicles">Vehicles</Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Header;
