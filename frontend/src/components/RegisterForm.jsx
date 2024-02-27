import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.detail || 'Registration failed');
        return;
      }

      // Handle successful registration, e.g., redirect to another page
      setErrorMessage('');
      navigate('/login');
      // Navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('An error occurred during registration');
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Registration</h2>
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
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
        <button onClick={handleRegistration}>Register</button>
        <div className="have-account">
          <p>Already have account?</p>
          {<Link to="/login">Login</Link>}
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default RegisterForm;
