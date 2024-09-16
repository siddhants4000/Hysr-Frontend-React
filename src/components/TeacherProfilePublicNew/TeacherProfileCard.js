import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ContactInfo.css'; // Assuming you have a CSS file for styling

const TeacherProfileCard = () => {
  // Use useLocation to get the username from the query parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  // State to store the form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    website: '',
    youtube: '',
    twitter: '',
    instagram: '',
    facebook: '',
    profilePictureUrl: '',
  });

  // Fetch the data from the API when the component mounts
  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:8080/hysr/teacher?username=${username}`) // Replace with your API endpoint
        .then((response) => {
          setFormData(response.data.data || {}); // Set fetched data to the form
          console.log(response.data);
        })
        .catch((error) => {
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

  console.log(handleChange);

  return (
    <div className="profile-card">
      <img
        src={formData.profilePictureUrl || 'https://bootdey.com/img/Content/avatar/avatar7.png'}
        alt="User Avatar"
        className="avatar"
      />
      <h2>{`${formData.firstName} ${formData.lastName}`}</h2>
      <p>City: {formData.city || 'No city available'}</p>
      <div className="social-links">
        {formData.website && (
          <p>
            Website: <a href={formData.website}>{formData.website}</a>
          </p>
        )}
        {formData.youtube && (
          <p>
            Youtube: <a href={formData.youtube}>{formData.youtube}</a>
          </p>
        )}
        {formData.twitter && (
          <p>
            Twitter: <a href={formData.twitter}>{formData.twitter}</a>
          </p>
        )}
        {formData.instagram && (
          <p>
            Instagram: <a href={formData.instagram}>{formData.instagram}</a>
          </p>
        )}
        {formData.facebook && (
          <p>
            Facebook: <a href={formData.facebook}>{formData.facebook}</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default TeacherProfileCard;
