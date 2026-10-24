import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>Jash Portfolio<span> (24CE004)</span></h2>
      </div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Home
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Projects
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Contact
        </NavLink>
        <button className="theme-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
