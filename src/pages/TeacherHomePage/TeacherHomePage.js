import React, { useState } from 'react';
import './TeacherHomePage.css';

const TeacherHomePage = ({ data = [], onSearch }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    typeOfLearning: '',
    levelOfSkill: '',
    modeOfLearning: '',
    learnerGender: '',
  });

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Use a memoized function to avoid recalculating filter results unnecessarily
  const handleSearch = () => {
    if (Array.isArray(data)) {
      const filteredData = data.filter((item) => {
        // Match query (subject search)
        const matchesQuery = item.listItems?.some((subject) =>
          subject.toLowerCase().includes(query.toLowerCase())
        );

        const matchesTypeOfLearning = filters.typeOfLearning
          ? item.typeOfLearning?.toLowerCase() === filters.typeOfLearning.toLowerCase()
          : true;

        const matchesLevelOfSkill = filters.levelOfSkill
          ? item.levelOfSkill?.toLowerCase() === filters.levelOfSkill.toLowerCase()
          : true;

        const matchesModeOfLearning = filters.modeOfLearning
          ? item.modeOfLearning?.toLowerCase() === filters.modeOfLearning.toLowerCase()
          : true;

        const matchesLearnerGender = filters.learnerGender
          ? item.learnerGender?.toLowerCase() === filters.learnerGender.toLowerCase()
          : true;

        return (
          matchesQuery &&
          matchesTypeOfLearning &&
          matchesLevelOfSkill &&
          matchesModeOfLearning &&
          matchesLearnerGender
        );
      });

      onSearch(filteredData.length > 0 ? filteredData : []); // Send empty array if no matches
    } else {
      console.error('Data is not an array');
      onSearch([]); // Default to empty array if data is invalid
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by Subject..."
        value={query}
        onChange={handleInputChange}
      />

      <select name="typeOfLearning" value={filters.typeOfLearning} onChange={handleFilterChange}>
        <option value="">Type of Learning</option>
        <option value="personal">Personal Classes</option>
        <option value="group">Group Classes</option>
      </select>

      <select name="levelOfSkill" value={filters.levelOfSkill} onChange={handleFilterChange}>
        <option value="">Level of Skill</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <select name="modeOfLearning" value={filters.modeOfLearning} onChange={handleFilterChange}>
        <option value="">Mode of Learning</option>
        <option value="online">Online</option>
        <option value="offline">Offline</option>
      </select>

      <select name="learnerGender" value={filters.learnerGender} onChange={handleFilterChange}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default TeacherHomePage;
