import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; 
import "../StudentProfile/ContactInfo.css";

const TeacherProfile1 = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  // State to track whether the data is being edited
  const [isEditing, setIsEditing] = useState(false);

  // State to store the form data
  const [formData, setFormData] = useState({
    videoUrl1: '',
    videoUrl2: '',
    videoUrl3: '',
    videoUrl4: '',
    videoUrl5: '',
  });

  // Fetch the data from the API when the component mounts
  useEffect(() => {
    if (username) {
      axios.get(`http://localhost:8080/hysr/teacher?username=${username}`) // Replace with your API endpoint
        .then(response => {
          setFormData(response.data.data || {}); // Ensure data is not undefined
          console.log(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
    }
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
      <h2>Video Information</h2>
      
      {isEditing ? (
        <>
          <p>
            <strong>Video 1: </strong>
            <input
              type="text"
              name="videoUrl1"
              value={formData.videoUrl1 || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Video 2: </strong>
            <input
              type="text"
              name="videoUrl2"
              value={formData.videoUrl2 || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Video 3: </strong>
            <input
              type="text"
              name="videoUrl3"
              value={formData.videoUrl3 || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Video 4: </strong>
            <input
              type="text"
              name="videoUrl4"
              value={formData.videoUrl4 || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Video 5: </strong>
            <input
              type="text"
              name="videoUrl5"
              value={formData.videoUrl5 || ''}
              onChange={handleChange}
            />
          </p>
          
          <button className="save-button" onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Video 1: </strong>{formData.videoUrl1 || ''}</p>
          <p><strong>Video 2: </strong>{formData.videoUrl2 || ''}</p>
          <p><strong>Video 3: </strong>{formData.videoUrl3 || ''}</p>
          <p><strong>Video 4: </strong>{formData.videoUrl4 || ''}</p>
          <p><strong>Video 5: </strong>{formData.videoUrl5 || ''}</p>
          
          <button className="edit-button" onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
};

export default TeacherProfile1;
