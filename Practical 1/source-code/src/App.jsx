import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Footer from './components/Footer';

function App() {
  const studentInfo = {
    name: "Jash Baldha",
    rollNo: "24CE004",
    title: "Full Stack Web Developer & Student",
    bio: "Passionate software engineering student specializing in modern web frameworks (React, Node.js, Express, MongoDB). Experienced in building clean, responsive user interfaces and RESTful APIs.",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript (ES6+)", "REST APIs", "CSS3 / HTML5", "Git & GitHub"],
    copyright: "© 2026 Jash Baldha (24CE004) | Advanced Web Framework (ITUE301)"
  };

  return (
    <div className="app-container">
      <Header name={studentInfo.name} title={studentInfo.title} rollNo={studentInfo.rollNo} />
      <main className="main-content">
        <About bio={studentInfo.bio} />
        <Skills skillsList={studentInfo.skills} />
      </main>
      <Footer copyrightText={studentInfo.copyright} />
    </div>
  );
}

export default App;
