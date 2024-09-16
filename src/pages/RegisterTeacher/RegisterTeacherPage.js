import React, { useState } from 'react';
import axios from 'axios';
import './RegisterTeacherPage.css';
import Header from '../../components/Header/Header';

const RegisterTeacher = () => {
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    mobileNumber: '',
    gender: '',  
    yearsOfExperience: '',
    modeOfTeaching: '',  
    talentDetails: '',
    achievements: '',
    awards: '',
    associations: '',
    chargesOfClasses: '',
    durationOfClass: '',
    freeTrialClass: '',
    videoUrl1: '',          
    videoUrl2: '',
    videoUrl3: '',
    videoUrl4: '',
    videoUrl5: '',
    profilePictureUrl: '',
    websiteUrl: '',
    youtubeChannelUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    facebookUrl: '',
    githubUrl: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return; // Stop form submission
    }

    try {
      const response = await axios.post('http://localhost:8080/hysr/teacher/add', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status.success) {
        alert('Teacher registered successfully!');
      } else {
        alert('Error: ' + response.data.status.message);
      }
    } catch (error) {
      console.error('There was an error registering the teacher!', error);
      alert('There was an error registering the teacher!');
    }
  };

  return (
    <div>
      <Header />
      <form className="register-form-teacher" onSubmit={handleSubmit}>
        <h1>Register</h1>

        {/* Fields for user details */}
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
        {/* Added Gender Field */}
        <div className="form-group">
          <label htmlFor="gender">Gender<span className="required">*</span></label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="yearsOfExperience">Years Of Experience<span className="required">*</span></label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            required
          />
        </div>
        {/* Added Mode of Teaching Field */}
        <div className="form-group">
          <label htmlFor="modeOfTeaching">Mode Of Teaching<span className="required">*</span></label>
          <select
            id="modeOfTeaching"
            name="modeOfTeaching"
            value={formData.modeOfTeaching}
            onChange={handleChange}
            required
          >
            <option value="">Select Mode</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="online and offline">Online and Offline</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="talentDetails">Talent Details<span className="required">*</span></label>
          <textarea
            id="talentDetails"
            name="talentDetails"
            value={formData.talentDetails}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="achievements">Achievements</label>
          <textarea
            id="achievements"
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="awards">Awards</label>
          <textarea
            id="awards"
            name="awards"
            value={formData.awards}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="associations">Associations</label>
          <textarea
            id="associations"
            name="associations"
            value={formData.associations}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="chargesOfClasses">Charges Of Classes<span className="required">*</span></label>
          <input
            type="number"
            id="chargesOfClasses"
            name="chargesOfClasses"
            value={formData.chargesOfClasses}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="durationOfClass">Duration Of Classes<span className="required">*</span></label>
          <input
            type="text"
            id="durationOfClass"
            name="durationOfClass"
            value={formData.durationOfClass}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Are you willing to offer a free trial class?<span className="required">*</span></label>
          <div className="radio-group">
            <input
              type="radio"
              id="freeTrialYes"
              name="freeTrialClass"
              value="true"
              checked={formData.freeTrialClass === 'true'}
              onChange={handleChange}
              required
            />
            <label htmlFor="freeTrialYes">Yes</label>
            <input
              type="radio"
              id="freeTrialNo"
              name="freeTrialClass"
              value="false"
              checked={formData.freeTrialClass === 'false'}
              onChange={handleChange}
              required
            />
            <label htmlFor="freeTrialNo">No</label>
          </div>
        </div>

        {/* Optional fields for videos, social media and other URLs */}
        <div className="form-group">
          <label htmlFor="videoUrl1">Video URL 1</label>
          <input
            type="text"
            id="videoUrl1"
            name="videoUrl1"
            value={formData.videoUrl1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="videoUrl2">Video URL 2</label>
          <input
            type="text"
            id="videoUrl2"
            name="videoUrl2"
            value={formData.videoUrl2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="videoUrl3">Video URL 3</label>
          <input
            type="text"
            id="videoUrl3"
            name="videoUrl3"
            value={formData.videoUrl3}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="videoUrl4">Video URL 4</label>
          <input
            type="text"
            id="videoUrl4"
            name="videoUrl4"
            value={formData.videoUrl4}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="videoUrl5">Video URL 5</label>
          <input
            type="text"
            id="videoUrl5"
            name="videoUrl5"
            value={formData.videoUrl5}
            onChange={handleChange}
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
          <label htmlFor="websiteUrl">Website URL</label>
          <input
            type="text"
            id="websiteUrl"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="youtubeChannelUrl">YouTube Channel URL</label>
          <input
            type="text"
            id="youtubeChannelUrl"
            name="youtubeChannelUrl"
            value={formData.youtubeChannelUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="twitterUrl">Twitter URL</label>
          <input
            type="text"
            id="twitterUrl"
            name="twitterUrl"
            value={formData.twitterUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="instagramUrl">Instagram URL</label>
          <input
            type="text"
            id="instagramUrl"
            name="instagramUrl"
            value={formData.instagramUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="facebookUrl">Facebook URL</label>
          <input
            type="text"
            id="facebookUrl"
            name="facebookUrl"
            value={formData.facebookUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="githubUrl">Github URL</label>
          <input
            type="text"
            id="githubUrl"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
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

export default RegisterTeacher;
