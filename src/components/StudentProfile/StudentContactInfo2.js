import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';  
import "../StudentProfile/ContactInfo.css";

const StudentProfile2 = () => {
  // Use useLocation to get the username from the query parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  // State to track whether the data is being edited
  const [isEditing, setIsEditing] = useState(false);

  // State to store the form data
  const [formData, setFormData] = useState({
    learnerName: '',
    learnerAge: '',
    learnerGender: '',
    learnerRelation: '',
    mobileNumber: '',
  });

  // Fetch the data from the API when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:8080/hysr/student?username=${username}`) // Replace with your API endpoint
      .then(response => {
        setFormData(response.data.data || {}); // Ensure data is not undefined
        console.log(response.data);
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
      <h2>Learner Information</h2>
      
      {isEditing ? (
        <>
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
              type="number"  // Changed to number input
              name="learnerAge"
              value={formData.learnerAge || ''}
              onChange={handleChange}
              min="1"  // Optional: you can set a minimum age value
            />
          </p>
          <p>
            <strong>Learner Gender: </strong>
            <select 
              name="learnerGender"  // Dropdown for learner gender
              value={formData.learnerGender || ''}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </p>
          <p>
            <strong>Relation to Learner: </strong>
            <select 
              name="learnerRelation"  // Dropdown for learner relation
              value={formData.learnerRelation || ''}
              onChange={handleChange}
            >
              <option value="">Select Relation</option>
              <option value="Self">Self</option>
              <option value="Parent">Parent</option>
              <option value="Guardian">Guardian</option>
            </select>
          </p>
          <p>
            <strong>Contact Details: </strong>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber || ''}
              onChange={handleChange}
            />
          </p>
          
          <button className="save-button" onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Learner Name: </strong>{formData.learnerName || ''}</p>
          <p><strong>Learner Age: </strong>{formData.learnerAge || ''}</p>
          <p><strong>Learner Gender: </strong>{formData.learnerGender || ''}</p>
          <p><strong>Relation to Learner: </strong>{formData.learnerRelation || ''}</p>
          <p><strong>Mobile Number: </strong>{formData.mobileNumber || ''}</p>
      
          <button className="edit-button" onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
};

export default StudentProfile2;
