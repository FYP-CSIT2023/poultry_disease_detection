import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { isAuthenticated } from '../App';

const Navbar = ({ style }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (authenticated) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setAuthenticated(false);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticatedUser = await isAuthenticated();
      setAuthenticated(isAuthenticatedUser);
    };

    checkAuthentication();
  }, []);
  return (
    <nav>
      <div
        className="navbar-links-container"
        style={style}
      >
        <div>
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

        <button
          className="login-logout-button"
          onClick={() => {
            handleLoginLogout();
          }}
        >
          {authenticated ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
