import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; 
import "../StudentProfile/ContactInfo.css";

const StudentProfile3 = () => {
  // Use useLocation to get the username from the query parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  // State to track whether the data is being edited
  const [isEditing, setIsEditing] = useState(false);

  // State to store the form data
  const [formData, setFormData] = useState({
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
  useEffect(() => {
    axios.get(`http://localhost:8080/hysr/student?username=${username}`) 
      .then(response => {
        setFormData(response.data.data || {}); 
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [username]);

  // Handle changes to the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
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
    try {
      await axios.put(`http://localhost:8080/hysr/student/update`, formData, {
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
      <h2>Course Information</h2>
      
      {isEditing ? (
        <>
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
            <select
              name="modeOfLearning"
              value={formData.modeOfLearning || ''}
              onChange={handleChange}
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </p>
          <p>
            <strong>Type of Learning: </strong>
            <select
              name="typeOfLearning"
              value={formData.typeOfLearning || ''}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Personal">Personal Classes</option>
              <option value="Group">Group Classes</option>
            </select>
          </p>
          <p>
            <strong>Level of Skill: </strong>
            <select
              name="levelOfSkill"
              value={formData.levelOfSkill || ''}
              onChange={handleChange}
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
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
            <select
              name="preferredGender"
              value={formData.preferredGender || ''}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
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

export default StudentProfile3;
