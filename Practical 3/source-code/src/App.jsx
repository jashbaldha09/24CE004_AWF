import React from 'react';
import Projects from './pages/Projects';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Jash Baldha <span>(24CE004)</span></h1>
      </header>
      <main className="main-content">
        <Projects />
      </main>
      <footer className="app-footer">
        <p>© 2026 Jash Baldha (24CE004) | Practical 3: API Integration & Data Rendering</p>
      </footer>
    </div>
  );
}

export default App;
