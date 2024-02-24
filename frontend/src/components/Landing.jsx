import React from 'react';
import BannerBackground from '../assets/landing_bg.jpg';
import './landing.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="Landing-container">
      <div className="background-container">
        <img
          src={BannerBackground}
          alt="background Image"
          className="background-image"
        />
      </div>
      <div className="content">
        <h1 className="title">Welcome to Poultry Disease Detection</h1>
        <p className="description">
          Welcome to our poultry disease detection system! Safeguard your flock
          with our Poultry Disease Detection System. This innovative solution
          empowers you to detect potential outbreaks early, minimize losses, and
          optimize flock health. Leverage our system to make informed decisions
          for timely treatment and disease prevention. Ensure the well-being of
          your birds and the sustainability of your farm. Explore our system
          today!
        </p>
        <button className="action-button" onClick={()=>navigate('detect')}>Detect Disease </button>
      </div>
    </div>
  );
};

export default Landing;
