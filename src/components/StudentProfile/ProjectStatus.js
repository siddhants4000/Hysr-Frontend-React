import React from 'react';

const ProjectStatus = () => {
  const projects = [
    { name: 'Web Design', status: 80 },
    { name: 'Website Markup', status: 72 },
    { name: 'One Page', status: 60 },
    { name: 'Mobile Template', status: 50 },
    { name: 'Backend API', status: 90 },
  ];

  return (
    <div className="project-status">
      <h2>Project Status</h2>
      {projects.map((project, index) => (
        <div key={index} className="project">
          <p>{project.name}</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${project.status}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStatus;
