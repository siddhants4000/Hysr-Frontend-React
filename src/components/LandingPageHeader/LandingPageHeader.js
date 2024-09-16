import React from 'react';
import './LandingPageHeader.css';
import capture1 from "../../assets/Capture1.JPG";

const LandingPageHeader = () => {
  return (
    <header className="landing-page-header">
      <img
        src={capture1}
        alt="Logo"
        className="logo"
      />
      <nav className="nav">
        <a href="https://www.google.com/" className="nav-link">Articles</a>
        <a href="https://www.google.com/" className="nav-link">People</a>
        <a href="https://www.google.com/" className="nav-link">Learning</a>
        <a href="https://www.google.com/" className="nav-link">Jobs</a>
        <a href="https://www.google.com/" className="nav-link">Games</a>
        <a href="https://www.google.com/" className="nav-link">Get the app</a>
      </nav>
      <div className="auth-buttons">
        <a href="https://www.google.com/" className="join-now">Join now</a>
        <a href="/login" className="sign-in">Sign in</a>
      </div>
    </header>
  );
};

export default LandingPageHeader;
