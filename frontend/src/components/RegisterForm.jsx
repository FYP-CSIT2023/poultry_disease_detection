import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const registerValidation = () => {
    event.preventDefault();
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setErrorMessage('');

    let isErrors = false;

    if (username.trim() === '') {
      setUsernameError('Username cannot be empty');
      isErrors = true;
    }
    if (email.trim() === '') {
      setEmailError('Email cannot be empty');
      isErrors = true;
    }
    if (password.length === 0) {
      setPasswordError('Password cannot be empty');
      isErrors = true;
    }
    if (password.length < 8) {
      setPasswordError('Password length must be at least 8 characters');
      isErrors = true;
    }
    if (isErrors) {
      return false;
    }
    return true;
  };

  const handleRegistration = async () => {
    const validation = registerValidation();

    if (validation) {
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

        setErrorMessage('');
        alert('Registration successful');
        navigate('/login');
      } catch (error) {
        console.error('Registration error:', error);
        setErrorMessage('An error occurred during registration');
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form-box">
        <h2>Registration</h2>
        <div>
          <label >
            Username <span className="required">*</span>
          </label>
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
          <label>
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        </div>
        <div>
          <label>
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>
        <button onClick={handleRegistration}>Register</button>
        <div className="have-account">
          <p>Already have account?</p>
          {<Link to="/login">Login</Link>}
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
