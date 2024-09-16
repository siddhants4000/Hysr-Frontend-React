import React from 'react';
import './LandingPage.css';

import LandingPageHeader from '../../components/LandingPageHeader/LandingPageHeader';
import Explore from '../../components/HomePage/Explore/Explore';
import FindJob from '../../components/HomePage/FindJob/FindJob';
import HomePageHeader from '../../components/HomePage/Header/HomePageHeader';

const LandingPage = () => {
  return (
    <div className="container">
      <LandingPageHeader />
      <HomePageHeader className="bg-col"></HomePageHeader>
      <Explore></Explore>
      <FindJob></FindJob>
    </div>
    
  );
};

export default LandingPage;
