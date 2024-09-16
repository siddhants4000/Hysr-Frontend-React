import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchPage from './SearchPage';
import Header from '../../components/Header/Header';
import ChatApp from '../../components/ChatMessenger/ChatMessenger';
import './SearchPageData.css';
import { useLocation } from 'react-router-dom';
import StudentCard from '../../components/Card/StudentCard';

const SearchPageData = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [newTeachers, setNewTeachers] = useState([]);  // Contains new teachers data
  const [connectionSentTeachers, setConnectionSentTeachers] = useState([]);
  const [connectedTeachers, setConnectedTeachers] = useState([]);
  const [activeTab, setActiveTab] = useState('newTeachers'); // Default tab
  const [isMessengerVisible, setIsMessengerVisible] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false); // Flag to check if data is loaded initially

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  // Fetch Data on Component Mount
  useEffect(() => {
    if (activeTab === 'newTeachers') {
      axios.get(`http://localhost:8080/hysr/teacher/all`)
        .then(response => {
          const mappedTeachers = response.data.data.map(teacher => ({
            name: `${teacher.firstName} ${teacher.lastName}`,
            username: teacher.userName,
            image: teacher.profilePictureUrl || 'https://cdn-icons-png.flaticon.com/512/666/666201.png',
            gender: teacher.gender || 'Not specified',
            modeOfInstruction: teacher.modeOfTeaching || 'Not specified',
            priceRange: teacher.chargesOfClasses || 'Not specified',
            experience: teacher.yearsOfExperience || 'Not specified',
            listItems: teacher.talentDetails ? [teacher.talentDetails] : [],
            links: [
              { href: '#', text: 'Connect' },
              { href: `/teacherProfilePagePublic?username=${teacher.userName}`, text: 'See Profile' }
            ]
          }));
          setNewTeachers(mappedTeachers);
          setFilteredData(mappedTeachers);  // Display all teachers initially
          setInitialDataLoaded(true); // Mark initial data as loaded
        })
        .catch(error => {
          console.error("Error fetching new teachers:", error);
        });
    }
  }, [activeTab]);  // Fetch new teachers data only when the tab is active

  // Fetch Connection Sent Teachers when the tab is active
  useEffect(() => {
    if (activeTab === 'connectionSent') {
      axios.get(`http://localhost:8080/hysr/mapping/student/isNotApproved?username=${username}`)
        .then(response => {
          const mappedConnectionSentTeachers = response.data.data.map(teacher => ({
            name: `${teacher.firstName} ${teacher.lastName}`,
            username: teacher.userName,
            image: 'https://cdn-icons-png.flaticon.com/512/666/666201.png',
            gender: teacher.gender || 'Not specified',
            modeOfInstruction: teacher.modeOfInstruction || 'Not specified',
            priceRange: teacher.chargesOfClasses || 'Not specified',
            experience: teacher.experience || 'Not specified',
            listItems: teacher.talentDetails ? [teacher.talentDetails] : [],
            links: [{ href: '#', text: 'Cancel' }]
          }));
          setConnectionSentTeachers(mappedConnectionSentTeachers);
          setFilteredData(mappedConnectionSentTeachers);  // Update filtered data
        })
        .catch(error => {
          console.error("Error fetching connection sent teachers:", error);
        });
    }
  }, [activeTab]);

  // Fetch Connected Teachers when the tab is active
  useEffect(() => {
    if (activeTab === 'connectedTeachers') {
      axios.get(`http://localhost:8080/hysr/mapping/student/isApproved?username=${username}`)
        .then(response => {
          const mappedConnectedTeachers = response.data.data.map(teacher => ({
            name: `${teacher.firstName} ${teacher.lastName}`,
            username: teacher.userName,
            image: 'https://cdn-icons-png.flaticon.com/512/666/666201.png',
            gender: teacher.gender || 'Not specified',
            modeOfInstruction: teacher.modeOfInstruction || 'Not specified',
            priceRange: teacher.chargesOfClasses || 'Not specified',
            experience: teacher.experience || 'Not specified',
            listItems: teacher.talentDetails ? [teacher.talentDetails] : [],
            links: [{ href: '#', text: 'Remove' }]
          }));
          setConnectedTeachers(mappedConnectedTeachers);
          setFilteredData(mappedConnectedTeachers);  // Update filtered data
        })
        .catch(error => {
          console.error("Error fetching connected teachers:", error);
        });
    }
  }, [activeTab]);

  const handleSearch = (results) => {
    setFilteredData(results);
  };

  // Handle Connect button click (Add new connection)
  const handleConnect = (teacherUsername) => {
    axios.post(`http://localhost:8080/hysr/mapping/add`, null, {
      params: { studentusername: username, teacherusername: teacherUsername }
    })
      .then(() => {
        alert("Connection request sent successfully.");
        window.location.reload(); // Refresh after successful connection
      })
      .catch(error => {
        console.error("Error sending connection request:", error);
      });
  };

  // Handle Cancel for Connection Sent Teachers
  const handleCancel = (teacherUsername) => {
    axios.post(`http://localhost:8080/hysr/mapping/delete`, null, {
      params: { studentusername: username, teacherusername: teacherUsername }
    })
      .then(() => {
        setConnectionSentTeachers(connectionSentTeachers.filter(teacher => teacher.username !== teacherUsername));
      })
      .catch(error => {
        console.error("Error canceling the connection:", error);
      });
  };

  // Handle Remove for Connected Teachers
  const handleRemove = (teacherUsername) => {
    axios.post(`http://localhost:8080/hysr/mapping/delete`, null, {
      params: { studentusername: username, teacherusername: teacherUsername }
    })
      .then(() => {
        setConnectedTeachers(connectedTeachers.filter(teacher => teacher.username !== teacherUsername));
      })
      .catch(error => {
        console.error("Error removing the connection:", error);
      });
  };

  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFilteredData([]); // Clear the filtered data when switching tabs
  };

  const renderRequests = (requests, showCancel = false, showRemove = false) => {
    if (initialDataLoaded && filteredData.length === 0) {
      return <p className="no-data-message">No Teachers Found</p>;
    }

    return (
      <StudentCard
        data={filteredData.length > 0 ? filteredData : requests}
        onCancel={handleCancel}
        onRemove={handleRemove}
        onConnect={handleConnect}
        showCancel={showCancel}
        showRemove={showRemove}
      />
    );
  };

  return (
    <div>
      <Header onMessengerClick={handleMessengerClick}></Header>
      <div className={`content ${isMessengerVisible ? 'with-messenger' : ''}`}>
        {isMessengerVisible && (
          <div className="chat-app-container">
            <ChatApp></ChatApp>
          </div>
        )}
      </div>
      <h1 style={{ textAlign: 'center' }}>Welcome, {username}</h1>

      {/* Tab buttons */}
      <div className="tab-buttons">
        <button
          onClick={() => handleTabChange('newTeachers')}
          className={`tab-button ${activeTab === 'newTeachers' ? 'active' : ''}`}
        >
          New Teachers
        </button>
        <button
          onClick={() => handleTabChange('connectionSent')}
          className={`tab-button ${activeTab === 'connectionSent' ? 'active' : ''}`}
        >
          Connection Sent Teachers
        </button>
        <button
          onClick={() => handleTabChange('connectedTeachers')}
          className={`tab-button ${activeTab === 'connectedTeachers' ? 'active' : ''}`}
        >
          Connected Teachers
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'newTeachers' && (
        <div>
          <h2 style={{ textAlign: 'center' }}>New Teachers</h2>
          <SearchPage data={newTeachers} onSearch={handleSearch} />
          {renderRequests(newTeachers)}
        </div>
      )}

      {activeTab === 'connectionSent' && (
        <div>
          <h2 style={{ textAlign: 'center' }}>Connection Sent Teachers</h2>
          <SearchPage data={connectionSentTeachers} onSearch={handleSearch} />
          {renderRequests(connectionSentTeachers, true, false)}
        </div>
      )}

      {activeTab === 'connectedTeachers' && (
        <div>
          <h2 style={{ textAlign: 'center' }}>Connected Teachers</h2>
          <SearchPage data={connectedTeachers} onSearch={handleSearch} />
          {renderRequests(connectedTeachers, false, true)}
        </div>
      )}
    </div>
  );
};

export default SearchPageData;
