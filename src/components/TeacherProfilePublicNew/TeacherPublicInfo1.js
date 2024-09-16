import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import "../StudentProfile/ContactInfo.css";

const TeacherPublicProfile1 = () => {
  // Use useLocation to get the username from the query parameter

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
    axios.get(`http://localhost:8080/hysr/teacher?username=${username}`) // Replace with your API endpoint
      .then(response => {
        setFormData(response.data.data || {}); // Ensure data is not undefined
        console.log(response.data);
        
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
      
  }, [username]); // Dependency array includes username so it refetches if username changes


  return (
    <div className="contact-info">
      <h2>Video Information</h2>
      
      {isEditing ? (
        <>
          <p>
            <strong>Video 1: </strong>
            <input
              type="text"
              name="userName"
              value={formData.videoUrl1 || ''}
              readOnly
            />
          </p>
          <p>
            <strong>Video 2: </strong>
            <input
              type="text"
              name="userName"
              value={formData.videoUrl2 || ''}
              readOnly
            />
          </p>
          <p>
            <strong>Video 3: </strong>
            <input
              type="text"
              name="userName"
              value={formData.videoUrl3 || ''}
              readOnly
            />
          </p>
          <p>
            <strong>Video 4: </strong>
            <input
              type="text"
              name="userName"
              value={formData.videoUrl4 || ''}
              readOnly
            />
          </p>
          <p>
            <strong>Video 5: </strong>
            <input
              type="text"
              name="userName"
              value={formData.videoUrl5 || ''}
              readOnly
            />
          </p>

        </>
      ) : (
        <>
          <p><strong>Video 1: </strong>{formData.videoUrl1 || ''}</p>
          <p><strong>Video 2: </strong>{formData.videoUrl2 || ''}</p>
          <p><strong>Video 3: </strong>{formData.videoUrl3 || ''}</p>
          <p><strong>Video 4: </strong>{formData.videoUrl4 || ''}</p>
          <p><strong>Video 5: </strong>{formData.videoUrl5 || ''}</p>

        </>
      )}
    </div>
  );
};

export default TeacherPublicProfile1;
