import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; 
import "../StudentProfile/ContactInfo.css";

const TeacherPublicProfile3 = () => {
  // Use useLocation to get the username from the query parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  // State to track whether the data is being edited
  const [isEditing, setIsEditing] = useState(false);

  // State to store the form data, including gender
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    gender: '',  // Added gender field
  });

  // Fetch the data from the API when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:8080/hysr/teacher?username=${username}`) 
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

  return (
    <div className="contact-info">
      <h2>Account Information</h2>
      
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
            <strong>Gender: </strong>
            <select
              name="gender"
              value={formData.gender || ''}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </p>
        </>
      ) : (
        <>
          <p><strong>Username: </strong>{formData.userName || ''}</p>
          <p><strong>First Name: </strong>{formData.firstName || ''}</p>
          <p><strong>Last Name: </strong>{formData.lastName || ''}</p>
          <p><strong>Gender: </strong>{formData.gender || 'Not specified'}</p>
        </>
      )}
    </div>
  );
};

export default TeacherPublicProfile3;
