import React from 'react';
import './ExperienceSection.css';

const ExperienceSection = () => {
  const experiences = [
    {
      company: 'T-Series',
      role: 'Senior Music Analyst',
      duration: 'Jan 2020 - Present',
    },
    {
      company: 'Tips Industries Limited',
      role: 'Music Analyst',
      duration: 'Jun 2019 - Aug 2019',
    },
    // Add more experiences as needed
  ];

  return (
    <div className="experience">
      <h2>Experience</h2>
      {experiences.map((exp, index) => (
        <div key={index} className="experience-item">
          <h3>{exp.role}</h3>
          <p>{exp.company}</p>
          <p>{exp.duration}</p>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;
