import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const loginValidation = () => {
    event.preventDefault();
    setUsernameError('');
    setPasswordError('');
    let isErrors = false;

    if (username.trim() === '') {
      setUsernameError('Please enter a username');
      isErrors = true;
    }

    if (password.length === 0) {
      setPasswordError('Please enter a password');
      isErrors = true;
    }
    if (isErrors) {
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    const validation = loginValidation();
    if (validation) {
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
          throw new Error('Invalid username or password');
        }

        const data = await response.json();
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('access_token', data.access);

        setErrorMessage('');
        navigate('/detect');
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form-box">
        <h2>Login</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
          {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>
        <button data-testid="login-button" onClick={handleLogin}>Login</button>
        <div className="have-account">
          <p>Don't have account?</p>
          {<Link to="/register">Register</Link>}
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
