import React from 'react';
import './FindJob.css';

const FindJob = () => {
  const searches = [
    'Engineering', 'Business Development', 'Finance', 'Administrative Assistant',
    'Retail Associate', 'Customer Service', 'Operations', 'Information Technology',
    'Marketing', 'Human Resources', 'More'
  ];

  return (
    <section className="find-job">
      <h2>Find the right job or internship for you</h2>
      <div className="searches">
        {searches.map((search, index) => (
          <button key={index} className="search-button">{search}</button>
        ))}
      </div>
    </section>
  );
};

export default FindJob;
