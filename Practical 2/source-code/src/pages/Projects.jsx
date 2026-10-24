import React from 'react';

function Projects() {
  const sampleProjects = [
    { id: 1, title: "Portfolio Application (24CE004)", desc: "React single page application built with Vite and React Router.", tag: "React" },
    { id: 2, title: "Task Manager API", desc: "RESTful API developed with Node.js, Express, and MongoDB Atlas.", tag: "Express / Node" },
    { id: 3, title: "Know Your Credit System", desc: "Full-stack web application built with modern web tools.", tag: "Full Stack" }
  ];

  return (
    <div className="page-container">
      <h1>Featured Projects</h1>
      <p className="page-subtitle">Demonstrating component rendering and multi-page routing for Jash Baldha (24CE004).</p>
      <div className="projects-grid">
        {sampleProjects.map((p) => (
          <div key={p.id} className="project-card">
            <span className="project-tag">{p.tag}</span>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
