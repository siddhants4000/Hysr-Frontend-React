import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ContactInfo.css'; // Assuming you have a CSS file for styling

const ProfileCard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  // State to track if the form is in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State to store form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    profilePictureUrl: '',
    city: '',
  });

  // Fetch data from API when component mounts
  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:8080/hysr/student?username=${username}`)
        .then((response) => {
          setFormData(response.data.data || {}); 
        })
        .catch((error) => {
          console.error('Error fetching teacher data:', error);
        });
    }
  }, [username]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Save the updated data
  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:8080/hysr/student/update`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Information saved successfully!');
      setIsEditing(false); // Exit edit mode after saving
    } catch (error) {
      console.error('Error saving teacher data:', error);
      alert('There was an error saving the data!');
    }
  };

  return (
    <div className="profile-card">
      <img
        src={formData.profilePictureUrl || 'https://bootdey.com/img/Content/avatar/avatar7.png'}
        alt="User Avatar"
        className="avatar"
      />

      {/* Displaying the name even when editing */}
      <h2>{`${formData.firstName} ${formData.lastName}`}</h2>

      {isEditing ? (
        <div className="edit-section">
          {/* Profile Picture URL Input */}
          <p>
            <strong>Profile Picture URL: </strong>
            <input
              type="text"
              name="profilePictureUrl"
              value={formData.profilePictureUrl || ''}
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

          <button className="save-button" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      ) : (
        <div>
          <p>City: {formData.city || 'No city available'}</p>
          <button className="edit-button" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
