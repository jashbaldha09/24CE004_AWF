import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`app-root ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="main-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="simple-footer">
        <p>© 2026 Jash Baldha (24CE004) | Practical 2: React State & Routing</p>
      </footer>
    </div>
  );
}

export default App;
