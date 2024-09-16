import React from 'react';
import './Explore.css';

const Explore = () => {
  const topics = [
    'Marketing', 'Public Administration', 'Healthcare', 'Engineering',
    'IT Services', 'Sustainability', 'Business Architecture', 'Education',
    'Telecommunications', 'HR Management', 'Social', 'More'
  ];

  return (
    <section className="explore">
      <h2>Explore collaborative articles</h2>
      <p>Explore content, experience, and expertise by tapping into the knowledge of your network.</p>
      <div className="topics">
        {topics.map((topic, index) => (
          <button key={index} className="topic-button">{topic}</button>
        ))}
      </div>
    </section>
  );
};

export default Explore;
