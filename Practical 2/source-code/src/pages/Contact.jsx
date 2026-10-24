import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: 'Jash Baldha', email: 'jashbaldha09@gmail.com', message: 'Hello! I am testing the controlled form component for Practical 2.' });
  const [submitted, setSubmitted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="page-container contact-page">
      <h1>Contact Jash Baldha (24CE004)</h1>
      <p className="page-subtitle">Demonstrating controlled inputs and dynamic state binding (useState).</p>

      {submitted ? (
        <div className="success-banner">
          <h3>Thank you, {formData.name}!</h3>
          <p>Your message has been received. I will get back to you at <strong>{formData.email}</strong> shortly.</p>
          <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Message:
              <span
                className="help-icon"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                ℹ️
              </span>
            </label>
            {showTooltip && <div className="tooltip">Controlled textarea tied to state via value & onChange</div>}
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              required
            ></textarea>
            <div className="char-count">Character Count: {formData.message.length} chars</div>
          </div>

          <button type="submit" className="btn btn-primary">Submit Message</button>
        </form>
      )}
    </div>
  );
}

export default Contact;
