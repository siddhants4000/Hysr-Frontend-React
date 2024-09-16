import React, { useState } from 'react';
import './RegisterStudentPage.css';
import Header from '../../components/Header/Header';
import axios from 'axios';

const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    learnerName: '',
    learnerAge: '',
    learnerGender: '',
    learnerRelation: '',
    mobileNumber: '',
    profilePictureUrl: '',  // New field for Profile Picture URL
    city: '',
    subject: '',
    modeOfLearning: '',
    typeOfLearning: '',
    placeOfLearning: '',
    levelOfSkill: '',
    timeConstraint: '',
    durationOfCourse: '',
    preferredGender: '',
    durationOfSession: '',
    budgetLimit: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/hysr/student/add', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status.success) {
        alert('Student registered successfully!');
      } else {
        alert('Error: ' + response.data.status.message);
      }
    } catch (error) {
      console.error('There was an error registering the student!', error);
      alert('There was an error registering the student!');
    }
  };

  return (
    <div>
      <Header />
      <form className="register-form-student" onSubmit={handleSubmit}>
        <h1>Register</h1>

        <div className="form-group">
          <label htmlFor="userName">User Name<span className="required">*</span></label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name<span className="required">*</span></label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name<span className="required">*</span></label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail Address<span className="required">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password<span className="required">*</span></label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password<span className="required">*</span></label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="learnerName">Learner Name<span className="required">*</span></label>
          <input
            type="text"
            id="learnerName"
            name="learnerName"
            value={formData.learnerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="learnerAge">Learner Age<span className="required">*</span></label>
          <input
            type="number"
            id="learnerAge"
            name="learnerAge"
            value={formData.learnerAge}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="learnerGender">Learner Gender<span className="required">*</span></label>
          <select
            id="learnerGender"
            name="learnerGender"
            value={formData.learnerGender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="learnerRelation">Relation between Profile Owner and Learner<span className="required">*</span></label>
          <select
            id="learnerRelation"
            name="learnerRelation"
            value={formData.learnerRelation}
            onChange={handleChange}
            required
          >
            <option value="">Select Relation</option>
            <option value="self">Self</option>
            <option value="parent">Parent</option>
            <option value="guardian">Guardian</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number<span className="required">*</span></label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="profilePictureUrl">Profile Picture URL</label>
          <input
            type="text"
            id="profilePictureUrl"
            name="profilePictureUrl"
            value={formData.profilePictureUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City<span className="required">*</span></label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject(s) of Interest</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="modeOfLearning">Preferred Mode of Learning<span className="required">*</span></label>
          <select
            id="modeOfLearning"
            name="modeOfLearning"
            value={formData.modeOfLearning}
            onChange={handleChange}
            required
          >
            <option value="">Select Mode</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="typeOfLearning">Preferred Type of Learning<span className="required">*</span></label>
          <select
            id="typeOfLearning"
            name="typeOfLearning"
            value={formData.typeOfLearning}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="personal">Personal</option>
            <option value="group">Group Classes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="placeOfLearning">Place of Learning<span className="required">*</span></label>
          <select
            id="placeOfLearning"
            name="placeOfLearning"
            value={formData.placeOfLearning}
            onChange={handleChange}
            required
          >
            <option value="">Select Place</option>
            <option value="home">At Home</option>
            <option value="center">Center</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="levelOfSkill">Level of Current Skill Set<span className="required">*</span></label>
          <select
            id="levelOfSkill"
            name="levelOfSkill"
            value={formData.levelOfSkill}
            onChange={handleChange}
            required
          >
            <option value="">Select Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="timeConstraint">Timings Constraint</label>
          <input
            type="text"
            id="timeConstraint"
            name="timeConstraint"
            value={formData.timeConstraint}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="durationOfCourse">Duration of Course Suitable to Them</label>
          <input
            type="text"
            id="durationOfCourse"
            name="durationOfCourse"
            value={formData.durationOfCourse}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="preferredGender">Preferred Gender of Educator</label>
          <select
            id="preferredGender"
            name="preferredGender"
            value={formData.preferredGender}
            onChange={handleChange}
          >
            <option value="">No Preference</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="durationOfSession">Duration of Session</label>
          <input
            type="text"
            id="durationOfSession"
            name="durationOfSession"
            value={formData.durationOfSession}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="budgetLimit">Budget Limit Per Session<span className="required">*</span></label>
          <input
            type="number"
            id="budgetLimit"
            name="budgetLimit"
            value={formData.budgetLimit}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="register-button">Register</button>
          <button type="button" className="login-button" onClick={() => window.location.href='/login'}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterStudent;
