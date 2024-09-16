import React, { useState } from 'react';
import ProfileCard from '../../components/StudentProfile/StudentProfileCard';
import ProjectStatus from '../../components/StudentProfile/ProjectStatus';
import './StudentProfilePage.css';
import Header from '../../components/Header/Header';
import ChatApp from '../../components/ChatMessenger/ChatMessenger';
import StudentProfile from '../../components/StudentProfile/StudentContactInfo';
import StudentProfile1 from '../../components/StudentProfile/StudentContactInfo1';
import StudentProfile2 from '../../components/StudentProfile/StudentContactInfo2';
import StudentProfile3 from '../../components/StudentProfile/StudentContactInfo3';

const StudentProfilePage = () => {
  const [isMessengerVisible, setIsMessengerVisible] = useState(false);

  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
  };

  return (
    <div>
      <Header onMessengerClick={handleMessengerClick}></Header>
      <div className={`content ${isMessengerVisible ? 'with-messenger' : ''}`}>
        {isMessengerVisible && (
          <div className="chat-app-container">
            <ChatApp />
          </div>
        )}
      </div>

      <div className="user-profile">
        <div className="profile-section ">
          <ProfileCard />
        </div>
        <div className="info-section">
          {/* Wrapping the components in a div and applying the card-effect */}
          <div className="card-effect">
            <StudentProfile />
          </div>
          <div className="card-effect">
            <StudentProfile2 />
          </div>
          <div className="card-effect">
            <StudentProfile3 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
