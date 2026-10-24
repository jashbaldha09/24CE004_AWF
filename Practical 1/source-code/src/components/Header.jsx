import React from 'react';

function Header({ name, title, rollNo }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="name">{name} <span className="roll-badge">({rollNo})</span></h1>
        <p className="title">{title}</p>
      </div>
    </header>
  );
}

export default Header;
