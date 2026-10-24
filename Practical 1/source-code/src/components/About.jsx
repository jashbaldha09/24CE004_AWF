import React from 'react';

function About({ bio }) {
  return (
    <section className="about-section">
      <h2>About Me</h2>
      <p>{bio}</p>
    </section>
  );
}

export default About;
