import React from 'react';
import './Header.css';
import capture1 from "../../assets/Capture1.JPG";
import { useLocation } from 'react-router-dom';

const Header = ({ onMessengerClick }) => {

  // Use useLocation to get the username from the query parameter

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const username = queryParams.get('username');

  return (
    <header className="header">
      <img
        src={capture1}
        alt="Logo"
        className="logo"
      />
      <div className="auth-buttons">
        <button className="messenger-button" onClick={onMessengerClick}>
          Messenger
        </button>
        <a href={`/studentProfile?username=${username}`} className="profile">Your Profile</a>
        <a href="/" className="log-out">Log Out</a>
      </div>
    </header>
  );
};

export default Header;
