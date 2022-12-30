import React from 'react';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';

import './Portfolio.css';
import '../../App.css';

const Portfolio = () => {
  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="portfolio-container">
          <h1>Navigate to Creator Portfolio</h1>
          <h6> Limited Functionality Here.</h6>
          <a href="https://portfolio-athena.netlify.app">View Portfolio</a>
      </div>
    </div>
  )
}

export default Portfolio