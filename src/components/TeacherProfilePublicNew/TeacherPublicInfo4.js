import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';  // Import useParams
import "../StudentProfile/ContactInfo.css";

const TeacherPublicProfile4 = () => {
  // Use useLocation to get the username from the query parameter

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const username = queryParams.get('username');

  // State to track whether the data is being edited
  const [isEditing, setIsEditing] = useState(false);

  // State to store the form data
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    accountType: '',
    profileName: '',
    learnerName: '',
    learnerAge: '',
    learnerGender: '',
    learnerRelation: '',
    contactDetail: '',
    city: '',
    subject: '',
    modeOfLearning: '',
    typeOfLearning: '',
    levelOfSkill: '',
    timeConstraint: '',
    durationOfSession: '',
    durationOfCourse: '',
    preferredGender: '',
    budgetLimit: ''
  });

  // Fetch the data from the API when the component mounts
  const [emailError, setEmailError] = useState('');
  useEffect(() => {
    axios.get(`http://localhost:8080/hysr/student?username=${username}`) // Replace with your API endpoint
      .then(response => {
        setFormData(response.data.data || {}); // Ensure data is not undefined
        console.log(response.data);
        
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
      
  }, [username]); // Dependency array includes username so it refetches if username changes

  // Handle changes to the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Email validation logic
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError('Invalid email format');
      } else {
        setEmailError('');
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle the edit button click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle the save button click
  const handleSaveClick = async () => {
    if (emailError) {
      alert('Please provide a valid email.');
      return;
    }
    try {
      await axios.put(`http://localhost:8080/hysr/teacher/update`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Information saved successfully!');
    } catch (error) {
      console.error('There was an error saving the data!', error);
      alert('There was an error saving the data!');
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="contact-info">
      <h2>Contact Information</h2>
      
      {isEditing ? (
        <>
          <p>
            <strong>Username: </strong>
            <input
              type="text"
              name="userName"
              value={formData.userName || ''}
              readOnly
            />
          </p>
          <p>
            <strong>First Name: </strong>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Last Name: </strong>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Email: </strong>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Password: </strong>
            <input
              type="password"
              name="password"
              value={formData.password || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Account Type: </strong>
            <input
              type="text"
              name="accountType"
              value={formData.accountType || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Profile Name: </strong>
            <input
              type="text"
              name="profileName"
              value={formData.profileName || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Learner Name: </strong>
            <input
              type="text"
              name="learnerName"
              value={formData.learnerName || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Learner Age: </strong>
            <input
              type="text"
              name="learnerAge"
              value={formData.learnerAge || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Learner Gender: </strong>
            <input
              type="text"
              name="learnerGender"
              value={formData.learnerGender || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Relation to Learner: </strong>
            <input
              type="text"
              name="learnerRelation"
              value={formData.learnerRelation || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Contact Details: </strong>
            <input
              type="text"
              name="contactDetail"
              value={formData.contactDetail || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>City: </strong>
            <input
              type="text"
              name="city"
              value={formData.city || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Subject: </strong>
            <input
              type="text"
              name="subject"
              value={formData.subject || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Mode of Learning: </strong>
            <input
              type="text"
              name="modeOfLearning"
              value={formData.modeOfLearning || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Type of Learning: </strong>
            <input
              type="text"
              name="typeOfLearning"
              value={formData.typeOfLearning || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Level of Skill: </strong>
            <input
              type="text"
              name="levelOfSkill"
              value={formData.levelOfSkill || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Time Constraint: </strong>
            <input
              type="text"
              name="timeConstraint"
              value={formData.timeConstraint || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Duration of Session: </strong>
            <input
              type="text"
              name="durationOfSession"
              value={formData.durationOfSession || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Duration of Course: </strong>
            <input
              type="text"
              name="durationOfCourse"
              value={formData.durationOfCourse || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Preferred Gender of Educator: </strong>
            <input
              type="text"
              name="preferredGender"
              value={formData.preferredGender || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Budget Limit: </strong>
            <input
              type="text"
              name="budgetLimit"
              value={formData.budgetLimit || ''}
              onChange={handleChange}
            />
          </p>
          <button className="save-button" onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Username: </strong>{formData.userName || ''}</p>
          <p><strong>First Name: </strong>{formData.firstName || ''}</p>
          <p><strong>Last Name: </strong>{formData.lastName || ''}</p>
          <p><strong>Email: </strong>{formData.email || ''}</p>
          <p><strong>Password: </strong>{formData.password || ''}</p>
          <p><strong>Account Type: </strong>{formData.accountType || ''}</p>
          <p><strong>Profile Name: </strong>{formData.profileName || ''}</p>
          <p><strong>Learner Name: </strong>{formData.learnerName || ''}</p>
          <p><strong>Learner Age: </strong>{formData.learnerAge || ''}</p>
          <p><strong>Learner Gender: </strong>{formData.learnerGender || ''}</p>
          <p><strong>Relation to Learner: </strong>{formData.learnerRelation || ''}</p>
          <p><strong>Contact Details: </strong>{formData.contactDetail || ''}</p>
          <p><strong>City: </strong>{formData.city || ''}</p>
          <p><strong>Subject: </strong>{formData.subject || ''}</p>
          <p><strong>Mode of Learning: </strong>{formData.modeOfLearning || ''}</p>
          <p><strong>Type of Learning: </strong>{formData.typeOfLearning || ''}</p>
          <p><strong>Level of Skill: </strong>{formData.levelOfSkill || ''}</p>
          <p><strong>Time Constraint: </strong>{formData.timeConstraint || ''}</p>
          <p><strong>Duration of Session: </strong>{formData.durationOfSession || ''}</p>
          <p><strong>Duration of Course: </strong>{formData.durationOfCourse || ''}</p>
          <p><strong>Preferred Gender of Educator: </strong>{formData.preferredGender || ''}</p>
          <p><strong>Budget Limit: </strong>{formData.budgetLimit || ''}</p>
          <button className="edit-button" onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
};

export default TeacherPublicProfile4;
