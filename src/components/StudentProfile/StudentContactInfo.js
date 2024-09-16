import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';  // Import useParams
import "../StudentProfile/ContactInfo.css";

const StudentProfile = () => {
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
        
          <button className="save-button" onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Username: </strong>{formData.userName || ''}</p>
          <p><strong>First Name: </strong>{formData.firstName || ''}</p>
          <p><strong>Last Name: </strong>{formData.lastName || ''}</p>
          <p><strong>Email: </strong>{formData.email || ''}</p>
          <p><strong>Password: </strong>{formData.password || ''}</p>
          
          <button className="edit-button" onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
};

export default StudentProfile;
