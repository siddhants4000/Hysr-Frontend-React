import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../LoginPage/LoginPage.css';
import staffImage from '../../assets/1.webp'; 
import studentImage from '../../assets/2.png'; 

const LoginPage = () => {
  const [accountType, setAccountType] = useState('Teacher');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate(); // Use useNavigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password,
    };

    try {
      let response;
      if (accountType === 'Teacher') {
        response = await axios.post('http://localhost:8080/hysr/teacher/login', loginData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        response = await axios.post('http://localhost:8080/hysr/student/login', loginData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      if (response.data.status.code === '200') {
        alert(`${accountType} logged in successfully!`);
        // Redirect to the appropriate profile page
        if (accountType === 'Teacher') {
          navigate(`/teacherProfile?username=${username}`);
        } else {
          navigate(`/search?username=${username}`);
        }
      } else {
        alert(`${response.data.status.message}`);
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      alert('There was an error logging in!');
    }
  };

  return (
    <div className="login-page">
      <h2>Choose Account Type</h2>
      <div className="account-types">
        <div
          className={`account-type ${accountType === 'Teacher' ? 'selected' : ''}`}
          onClick={() => setAccountType('Teacher')}
        >
          <img src={staffImage} alt="Teacher" />
          <p>Teacher</p>
        </div>
        <div
          className={`account-type ${accountType === 'Student' ? 'selected' : ''}`}
          onClick={() => setAccountType('Student')}
        >
          <img src={studentImage} alt="Student" />
          <p>Student</p>
        </div>
      </div>
      <div className="form-container">
        <h3>Hello {accountType.toLowerCase()}!</h3>
        <p>Please fill out the form below to get started</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <a href="https://www.google.com/" className="forgot-link">Forgot?</a>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="signup-text">No account? <a href="https://www.google.com/">Signup</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
