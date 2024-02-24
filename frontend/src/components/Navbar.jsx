import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-links-container">
        <Link
          className="link"
          to="/"
        >
          Home
        </Link>
        <Link
          className="link"
          to="/about"
        >
          About
        </Link>
        <Link
          className="link"
          to="/detect"
        >
          Detect
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
