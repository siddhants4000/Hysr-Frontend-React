import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import TeacherCard from '../../components/Card/TeacherCard';
import ChatApp from '../../components/ChatMessenger/ChatMessenger';
import './TeacherHomePageData.css';
import { useLocation } from 'react-router-dom';
import TeacherHomePage from "../TeacherHomePage/TeacherHomePage";

const TeacherHomePageData = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]); // Incoming requests data
  const [acceptedRequests, setAcceptedRequests] = useState([]); // Accepted requests data
  const [activeTab, setActiveTab] = useState('incomingRequests'); // Default tab is incoming requests
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isDataLoaded, setIsDataLoaded] = useState(false); // To check if data has been loaded
  const [isMessengerVisible, setIsMessengerVisible] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  // Fetch incoming requests
  const fetchIncomingRequests = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/hysr/mapping/teacher/isNotApproved?username=${username}`)
      .then((response) => {
        const mappedIncomingRequests = response.data.data.map((student) => ({
          name: `${student.firstName} ${student.lastName}`,
          username: student.userName,
          image: student.profilePictureUrl || 'https://cdn-icons-png.flaticon.com/512/666/666201.png',
          learnerGender: student.learnerGender || 'Not specified',
          learnerAge: student.learnerAge || 'Not specified',
          category: student.talentDetails || 'Not specified',
          modeOfLearning: student.modeOfLearning || 'Not specified',
          typeOfLearning: student.typeOfLearning || 'Not specified',
          levelOfSkill: student.levelOfSkill || 'Not specified',
          listItems: [student.subject] || 'Not specified',
          links: [
            { href: '#', text: 'Approve', onClick: () => handleApprove(student.userName) },
            { href: '#', text: 'Cancel', onClick: () => handleCancel(student.userName) },
          ],
        }));
        setIncomingRequests(mappedIncomingRequests);
        setFilteredData(mappedIncomingRequests);
        setIsLoading(false);
        setIsDataLoaded(true); // Indicate data has been loaded
      })
      .catch((error) => {
        console.error('Error fetching incoming requests:', error);
        setIsLoading(false);
        setIsDataLoaded(true);
      });
  };

  // Fetch accepted requests
  const fetchAcceptedRequests = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/hysr/mapping/teacher/isApproved?username=${username}`)
      .then((response) => {
        const mappedAcceptedRequests = response.data.data.map((student) => ({
          name: `${student.firstName} ${student.lastName}`,
          username: student.userName,
          image: student.profilePictureUrl || 'https://cdn-icons-png.flaticon.com/512/666/666201.png',
          learnerGender: student.learnerGender || 'Not specified',
          learnerAge: student.learnerAge || 'Not specified',
          category: student.talentDetails || 'Not specified',
          modeOfLearning: student.modeOfLearning || 'Not specified',
          typeOfLearning: student.typeOfLearning || 'Not specified',
          levelOfSkill: student.levelOfSkill || 'Not specified',
          listItems: [student.subject] || 'Not specified',
          links: [{ href: '#', text: 'Remove', onClick: () => handleRemove(student.userName) }],
        }));
        setAcceptedRequests(mappedAcceptedRequests);
        setFilteredData(mappedAcceptedRequests);
        setIsLoading(false);
        setIsDataLoaded(true); // Indicate data has been loaded
      })
      .catch((error) => {
        console.error('Error fetching accepted requests:', error);
        setIsLoading(false);
        setIsDataLoaded(true);
      });
  };

  useEffect(() => {
    if (activeTab === 'incomingRequests') {
      fetchIncomingRequests();
    } else if (activeTab === 'acceptedRequests') {
      fetchAcceptedRequests();
    }
  }, [activeTab, username]);

  // Handle Approve
  const handleApprove = (studentUsername) => {
    axios
      .post(`http://localhost:8080/hysr/mapping/approval`, null, {
        params: { studentusername: studentUsername, teacherusername: username },
      })
      .then(() => {
        setIncomingRequests((prev) => prev.filter((student) => student.username !== studentUsername));
        setFilteredData((prev) => prev.filter((student) => student.username !== studentUsername));
      })
      .catch((error) => {
        console.error('Error approving the connection:', error);
      });
  };

  // Handle Cancel
  const handleCancel = (studentUsername) => {
    axios
      .post(`http://localhost:8080/hysr/mapping/delete`, null, {
        params: { studentusername: studentUsername, teacherusername: username },
      })
      .then(() => {
        setIncomingRequests((prev) => prev.filter((student) => student.username !== studentUsername));
        setFilteredData((prev) => prev.filter((student) => student.username !== studentUsername));
      })
      .catch((error) => {
        console.error('Error canceling the connection:', error);
      });
  };

  // Handle Remove
  const handleRemove = (studentUsername) => {
    axios
      .post(`http://localhost:8080/hysr/mapping/delete`, null, {
        params: { studentusername: studentUsername, teacherusername: username },
      })
      .then(() => {
        setAcceptedRequests((prev) => prev.filter((student) => student.username !== studentUsername));
        setFilteredData((prev) => prev.filter((student) => student.username !== studentUsername));
      })
      .catch((error) => {
        console.error('Error removing the connection:', error);
      });
  };

  const renderRequests = (requests, filteredData, showApprove = false, showCancel = false, showRemove = false) => {
    if (isLoading) {
      return <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

    if (!isLoading && isDataLoaded && filteredData.length === 0 && requests.length === 0) {
      return <p style={{ textAlign: 'center' }}>No Requests Found</p>;
    }

    return (
      <TeacherCard
        data={filteredData.length > 0 ? filteredData : requests}
        onApprove={handleApprove}
        onCancel={handleCancel}
        onRemove={handleRemove}
        showApprove={showApprove}
        showCancel={showCancel}
        showRemove={showRemove}
      />
    );
  };

  return (
    <div>
      <Header onMessengerClick={() => setIsMessengerVisible(!isMessengerVisible)} />
      <div className={`content ${isMessengerVisible ? 'with-messenger' : ''}`}>
        {isMessengerVisible && (
          <div className="chat-app-container">
            <ChatApp />
          </div>
        )}
      </div>
      <h1 style={{ textAlign: 'center' }}>Welcome, {username}</h1>

      {/* Tab buttons */}
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab('incomingRequests')}
          className={`tab-button ${activeTab === 'incomingRequests' ? 'active' : ''}`}
        >
          Incoming Requests
        </button>
        <button
          onClick={() => setActiveTab('acceptedRequests')}
          className={`tab-button ${activeTab === 'acceptedRequests' ? 'active' : ''}`}
        >
          Accepted Requests
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'incomingRequests' && (
        <div>
          <h2 style={{ textAlign: 'center' }}>Incoming Requests</h2>
          <TeacherHomePage data={incomingRequests} onSearch={setFilteredData} />
          {renderRequests(incomingRequests, filteredData, true, true, false)} {/* Show Approve and Cancel */}
        </div>
      )}

      {activeTab === 'acceptedRequests' && (
        <div>
          <h2 style={{ textAlign: 'center' }}>Accepted Requests</h2>
          <TeacherHomePage data={acceptedRequests} onSearch={setFilteredData} />
          {renderRequests(acceptedRequests, filteredData, false, false, true)} {/* Show Remove */}
        </div>
      )}
    </div>
  );
};

export default TeacherHomePageData;
