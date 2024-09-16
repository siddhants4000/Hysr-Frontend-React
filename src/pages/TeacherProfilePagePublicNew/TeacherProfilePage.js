import React, { useState } from 'react';
import './TeacherProfilePage.css';
import Header from '../../components/Header/Header';
import ChatApp from '../../components/ChatMessenger/ChatMessenger';
import TeacherPublicProfile from '../../components/TeacherProfilePublicNew/TeacherPublicInfo';
import TeacherPublicProfile2 from '../../components/TeacherProfilePublicNew/TeacherPublicInfo2';
import TeacherPublicProfile3 from '../../components/TeacherProfilePublicNew/TeacherPublicInfo3';
import SkillsSection from '../../components/TeacherProfilePublicNew/SkillsSection/SkillsSection';
import TeacherProfileCard from '../../components/TeacherProfilePublicNew/TeacherProfileCard';

const TeacherProfilePagePublicNew = () => {
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
          <TeacherProfileCard />
        </div>
        <div className="info-section">
          {/* Wrapping the components in a div and applying the card-effect */}
          <div className="card-effect">
            <TeacherPublicProfile3 />
          </div>
          <div className="card-effect">
            <TeacherPublicProfile />
          </div>
          <div className="card-effect">
            <TeacherPublicProfile2 />
          </div>
          {/* Skills Section spanning the entire row */}
          <div className="skills-section-row">
            <SkillsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfilePagePublicNew;
