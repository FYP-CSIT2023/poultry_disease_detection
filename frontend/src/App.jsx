import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import UploadButton from './components/upload';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { jwtDecode } from 'jwt-decode';
import RequireAuth from './components/RequireAuth';

export const isAuthenticated = () => {
  // Retrieve the JWT token from localStorage
  const token = localStorage.getItem('access_token');

  // Check if the token exists and is not expired (you should replace this with your actual token validation logic)
  if (token) {
    // Decode the token to get expiration time
    const decodedToken = jwtDecode(token);

    // Check if the token is not expired
    const isTokenNotExpired = decodedToken.exp * 1000 > Date.now();

    return isTokenNotExpired;
  }
  return false;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<LoginForm />}
        />
        <Route
          path="/register"
          element={<RegisterForm />}
        />
        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/detect"
          element={
            <RequireAuth>
              <UploadButton buttonText="Upload Image" />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
