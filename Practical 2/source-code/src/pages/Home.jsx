import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page-container home-page">
      <div className="hero-card">
        <h1>Welcome to Jash Baldha's Portfolio</h1>
        <p className="subtitle">Enrollment No: 24CE004 | Advanced Web Framework (ITUE301)</p>
        <p className="description">
          This single-page application demonstrates client-side routing with React Router v6 and interactive state management using the <code>useState</code> hook.
        </p>
        <div className="cta-buttons">
          <Link to="/projects" className="btn btn-primary">View Projects</Link>
          <Link to="/contact" className="btn btn-secondary">Get in Touch</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
