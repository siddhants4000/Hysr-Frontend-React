import React, { useState } from 'react';
import './TeacherProfilePage.css';
import Header from '../../components/Header/Header.js';
import MainSection from '../../components/TeacherProfile/MainSection/MainSection.js';
import AboutSection from '../../components/TeacherProfile/AboutSection/AboutSection.js';
import ExperienceSection from '../../components/TeacherProfile/ExperienceSection/ExperienceSection.js';
import SkillsSection from '../../components/TeacherProfilePublicNew/SkillsSection/SkillsSection.js';
import ChatApp from '../../components/ChatMessenger/ChatMessenger.js';

const TeacherProfilePage = () => {
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
            <ChatApp></ChatApp>
          </div>
        )}
        </div>
        <MainSection></MainSection>
        <AboutSection></AboutSection>
        <ExperienceSection></ExperienceSection>
        <SkillsSection></SkillsSection>
    </div>
  );
};

export default TeacherProfilePage;
