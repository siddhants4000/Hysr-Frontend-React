import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SearchPageData from './pages/StudentHomePage/SearchPageData';
import RegisterStudent from './pages/RegisterStudent/RegisterStudentPage';
import RegisterTeacher from './pages/RegisterTeacher/RegisterTeacherPage';
import StudentProfilePage from './pages/StudentProfilePage/StudentProfilePage';
import TeacherHomePageData from './pages/TeacherHomePage/TeacherHomePageData';
import TeacherProfilePagePublicNew from './pages/TeacherProfilePagePublicNew/TeacherProfilePage';
import TeacherProfilePagePrivate from './pages/TeacherProfilePagePrivate/TeacherProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage></LandingPage>}></Route>
        <Route exact path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route exact path='/teacherProfilePage' element={<TeacherProfilePagePrivate></TeacherProfilePagePrivate>}></Route>
        <Route exact path='/teacherProfilePagePublic' element={<TeacherProfilePagePublicNew></TeacherProfilePagePublicNew>}></Route>
        <Route exact path='/studentProfile' element={<StudentProfilePage></StudentProfilePage>}></Route>
        <Route exact path='/search' element={<SearchPageData></SearchPageData>}></Route>
        <Route exact path='/teacherHomePage' element={<TeacherHomePageData></TeacherHomePageData>}></Route>
        <Route exact path='/registerStudent' element={<RegisterStudent></RegisterStudent>}></Route>
        <Route exact path='/registerTeacher' element={<RegisterTeacher></RegisterTeacher>}></Route>
        
        <Route path='/*' element={<h1>Page Not Found</h1>}></Route>
      </Routes>
    </Router> 
  );
}

export default App;
