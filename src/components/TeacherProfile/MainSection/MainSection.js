import React from 'react';
import './MainSection.css';

const MainSection = () => {
  return (
    <div className="profile-header">
      <img src="https://as1.ftcdn.net/v2/jpg/03/17/48/98/1000_F_317489859_JQ0kQWfo1T2JpruvXpmevjojTi2u7yJH.jpg" alt="Profile" className="profile-image" />
      <div className="profile-info">
        <h1>Teacher Name</h1>
        <p>Music Teacher at T-Series</p>
        <p>500+ connections</p>
        <div className="buttons">
          <button className="connect-button">Open to</button>
          <button className="message-button">Add profile section</button>
          <button className="more-button">More</button>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
