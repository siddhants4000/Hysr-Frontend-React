import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './SkillsSection.css';

const SkillsSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  // UseLocation hook to get the query parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username'); // Get the username from the query parameter

  // Function to handle clicking on a video thumbnail
  const handleThumbnailClick = (video) => {
    setSelectedVideo(video);
  };

  // Function to close the video player modal
  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  // Fetch teacher's video URLs from the API
  useEffect(() => {
    if (username) {
      axios.get(`http://localhost:8080/hysr/teacher?username=${username}`)
        .then(response => {
          console.log(response.data.data);
          
          const teacherData = response.data.data;
          const fetchedVideos = [];

          // Check if the video URLs exist and push them to the videos array
          if (teacherData.videoUrl1) {
            fetchedVideos.push({
              title: 'Video 1',
              url: teacherData.videoUrl1
            });
          }
          if (teacherData.videoUrl2) {
            fetchedVideos.push({
              title: 'Video 2',
              url: teacherData.videoUrl2
            });
          }
          if (teacherData.videoUrl3) {
            fetchedVideos.push({
              title: 'Video 3',
              url: teacherData.videoUrl3
            });
          }
          if (teacherData.videoUrl4) {
            fetchedVideos.push({
              title: 'Video 4',
              url: teacherData.videoUrl4
            });
          }
          if (teacherData.videoUrl5) {
            fetchedVideos.push({
              title: 'Video 5',
              url: teacherData.videoUrl5
            });
          }

          // Set the videos array
          setVideos(fetchedVideos);
        })
        .catch(error => {
          console.error('Error fetching teacher data:', error);
        });
    }
  }, [username]); // Dependency array ensures this runs when username changes

  return (
    <div className="skills">
      <h2>Video Section</h2>
      <div className="video-grid">
        {videos.map((video, index) => (
          <div
            key={index}
            className="video-card"
            onClick={() => handleThumbnailClick(video)}
          >
            <img
              src={'https://cdn.pixabay.com/photo/2016/07/03/18/36/youtube-1495277_1280.png'}
              alt={video.title}
              className="video-thumbnail"
            />
            <div className="video-info">
              <h4>{video.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="video-modal">
          <div className="video-modal-content">
            <span className="close-button" onClick={closeVideoPlayer}>
              &times;
            </span>
            <h4>{selectedVideo.title}</h4>
            <iframe
              width="800" // Increased width
              height="450" // Increased height
              src={selectedVideo.url}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
