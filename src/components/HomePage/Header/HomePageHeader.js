import React from 'react';
import './HomePageHeader.css';
import { ReactTyped as Typed } from 'react-typed';

const HomePageHeader = () => {
    return (
      <div className="homepage-header">
        <header className="home-header">
          <div className="header-left">
            <div className="header-content">
              <div className="typing-effect">
                <Typed
                  strings={["Welcome to your professional community"]}
                  typeSpeed={100}
                  backSpeed={100}
                  loop
                />
              </div>
              <p>New to HYSR? <a href="https://www.google.com/">Join now</a></p>
            </div>
            <div className="login-buttons">
              <button className="google-button">
                <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png" alt="Google Logo" className="google-logo" />
                Continue with Google
              </button>
              <button className="email-button">
                <img src="data:image/png;base64,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" alt="Email Logo" className="google-logo" />
                Sign in with email
              </button>
            </div>
          </div>
        </header>
      </div>
    );
  };
  
  export default HomePageHeader;
