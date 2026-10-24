import React from 'react';

function Skills({ skillsList }) {
  return (
    <section className="skills-section">
      <h2>Technical Skills</h2>
      <div className="skills-grid">
        {skillsList.map((skill, index) => (
          <div key={index} className="skill-card">
            <span className="skill-icon">⚡</span>
            <span className="skill-name">{skill}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
