import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.detail || 'Login failed');
        return;
      }

      const data = await response.json();
      // Store the tokens in local storage or a secure storage mechanism
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('access_token', data.access);

      setErrorMessage('');
      navigate('/detect');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred during login');
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Login</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        <div className="have-account">
          <p>Don't have account?</p>
          {<Link to="/register">Register</Link>}
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
