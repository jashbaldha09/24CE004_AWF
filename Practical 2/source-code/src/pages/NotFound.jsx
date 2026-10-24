import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page-container not-found-page">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Return to Home</Link>
    </div>
  );
}

export default NotFound;
