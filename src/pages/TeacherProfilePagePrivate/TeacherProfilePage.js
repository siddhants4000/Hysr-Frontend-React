import React, { useState } from 'react';
import './TeacherProfilePage.css';
import Header from '../../components/Header/Header';
import ChatApp from '../../components/ChatMessenger/ChatMessenger';
import TeacherProfile from '../../components/TeacherProfilePrivate/TeacherContactInfo';
import TeacherProfile2 from '../../components/TeacherProfilePrivate/TeacherContactInfo2';
import TeacherProfile3 from '../../components/TeacherProfilePrivate/TeacherContactInfo3';
import TeacherProfile1 from '../../components/TeacherProfilePrivate/TeacherContactInfo1';
import TeacherProfileCardPrivate from '../../components/TeacherProfilePrivate/TeacherProfileCardPrivate';

const TeacherProfilePagePrivate = () => {
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
          <TeacherProfileCardPrivate />
        </div>
        <div className="info-section">
          {/* Wrapping the components in a div and applying the card-effect */}
          <div className="card-effect">
            <TeacherProfile3 />
          </div>
          <div className="card-effect">
            <TeacherProfile1 />
          </div>
          <div className="card-effect">
            <TeacherProfile />
          </div>
          <div className="card-effect">
            <TeacherProfile2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfilePagePrivate;
