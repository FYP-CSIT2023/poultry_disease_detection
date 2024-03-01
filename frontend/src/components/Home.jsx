import React from 'react';
import Navbar from './Navbar';
import './home.css';
import Landing from './Landing';

const Home = () => {
  return (
    <div className="home-container">
      <div className="gray-top"></div>
      <Navbar />
      <Landing />
    </div>
  );
};

export default Home;
