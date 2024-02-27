import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

// This method checks if the JWT token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Check if the token expiry time is before the current time
    return decoded.exp < currentTime;
  } catch (error) {
    // If error occurs while decoding, return true (which implies the token is invalid or expired)
    return true;
  }
};

// Use auth hook to determine if the user is authenticated
const useAuth = () => {
  // Retrieve the JWT token from storage (adjust this to where you store your token)
  const userToken = localStorage.getItem('access_token');
    
  // If token is not available or expired, return false
  if (!userToken || isTokenExpired(userToken)) {
    return false;
  }

  // User is considered authenticated if the token exists and is not expired
  return true;
};

// RequireAuth component
const RequireAuth = ({ children }) => {
  const isLoggedIn = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // If user is not logged in (or token is expired), navigate to the login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in, render the protected component
  return children;
};

export default RequireAuth;