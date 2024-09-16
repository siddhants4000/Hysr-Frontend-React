import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';  
import "../StudentProfile/ContactInfo.css";

const TeacherPublicProfile2 = () => {
  // Use useLocation to get the username from the query parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  // State to track whether the data is being edited
  const [isEditing, setIsEditing] = useState(false);

  // State to store the form data
  const [formData, setFormData] = useState({
    yearsOfExperience:'',
    talentDetails: '',
    achievements: '',
    awards: '',
    associations: '',
  });

  // Fetch the data from the API when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:8080/hysr/teacher?username=${username}`) // Replace with your API endpoint
      .then(response => {
        setFormData(response.data.data || {}); // Ensure data is not undefined
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
      <h2>Teacher Information</h2>
      
      {isEditing ? (
        <>
          <p>
            <strong>Years Of Experience: </strong>
            <input
              type="number"
              name="yearsOfExperience"
              value={formData.yearsOfExperience || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Talent Details: </strong>
            <input
              type="text"
              name="talentDetails"
              value={formData.talentDetails || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Achievements: </strong>
            <input
              type="text"  
              name="achievements"
              value={formData.achievements || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Awards: </strong>
            <input
              type="text"  
              name="awards"
              value={formData.awards || ''}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Associations: </strong>
            <input
              type="text"  
              name="associations"
              value={formData.associations || ''}
              onChange={handleChange}
            />
          </p>

        </>
      ) : (
        <>
          <p><strong>Years Of Experience: </strong>{formData.yearsOfExperience || ''}</p>
          <p><strong>Talent Details: </strong>{formData.talentDetails || ''}</p>
          <p><strong>Achievements: </strong>{formData.achievements || ''}</p>
          <p><strong>Awards: </strong>{formData.awards || ''}</p>
          <p><strong>Associations: </strong>{formData.associations || ''}</p>

        </>
      )}
    </div>
  );
};

export default TeacherPublicProfile2;
