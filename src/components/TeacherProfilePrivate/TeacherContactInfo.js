import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import "../StudentProfile/ContactInfo.css";

const TeacherProfile = () => {
  // Use useLocation to get the username from the query parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  // State to track whether the data is being edited
  const [isEditing, setIsEditing] = useState(false);

  // State to store the form data
  const [formData, setFormData] = useState({
    chargesOfClasses: '',  // This will be a number
    durationOfClass: '',
    freeTrialClass: '',     // Default value as false
  });

  // Fetch the data from the API when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:8080/hysr/teacher?username=${username}`) // Replace with your API endpoint
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

  // Handle the select change for free trial class
  const handleSelectChange = (e) => {
    const value = e.target.value === 'true'; // Convert to boolean
    setFormData((prevState) => ({
      ...prevState,
      freeTrialClass: value,
    }));
  };

  // Handle the edit button click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle the save button click
  const handleSaveClick = async () => {
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
      <h2>Class Information</h2>

      {isEditing ? (
        <>
          <p>
            <strong>Charges Of Classes: </strong>
            <input
              type="number"  // Set input type as number
              name="chargesOfClasses"
              value={formData.chargesOfClasses || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Duration Of Class: </strong>
            <input
              type="text"
              name="durationOfClass"
              value={formData.durationOfClass || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Free Trial Class: </strong>
            <select
              name="freeTrialClass"
              value={formData.freeTrialClass === true ? 'true' : 'false'}
              onChange={handleSelectChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </p>

          <button className="save-button" onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Charges Of Classes: </strong>{formData.chargesOfClasses || ''}</p>
          <p><strong>Duration Of Class: </strong>{formData.durationOfClass || ''}</p>
          <p><strong>Free Trial Class: </strong>{formData.freeTrialClass ? 'Yes' : 'No'}</p>

          <button className="edit-button" onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
};

export default TeacherProfile;
