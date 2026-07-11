import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact({ showAnimate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs.send(
      'service_ck5mnga',
      'template_qg286lq',
      {
        name: formData.fullName,
        email: formData.email,
        message: `📱 Mobile: ${formData.mobile}
📌 Subject: ${formData.subject}

💬 Message:
${formData.message}`
      },
      'bYQd7V4PwivGPmNiF'
    )
    .then(() => {
      setStatus('✅ Message sent successfully!');
      setFormData({ fullName: '', email: '', mobile: '', subject: '', message: '' });
    })
    .catch((err) => {
      console.error('EmailJS Error:', err);
      const errorMsg = err?.text || err?.message || JSON.stringify(err);
      setStatus(`❌ Error: ${errorMsg}`);
    });
  };

  return (
    <section className={`contact ${showAnimate ? 'show-animate' : ''}`} id="contact">
      <h2 className="heading">
        Contact <span>Me</span>
        <span className="animate scroll" style={{ '--i': 1 }}></span>
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <div className="input-field">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <span className="focus"></span>
          </div>
          <div className="input-field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span className="focus"></span>
          </div>

          <span className="animate scroll" style={{ '--i': 3 }}></span>
        </div>

        <div className="input-box">
          <div className="input-field">
            <input
              type="number"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <span className="focus"></span>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="subject"
              placeholder="Email Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <span className="focus"></span>
          </div>

          <span className="animate scroll" style={{ '--i': 5 }}></span>
        </div>

        <div className="textarea-field">
          <textarea
            name="message"
            cols="30"
            rows="10"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <span className="focus"></span>

          <span className="animate scroll" style={{ '--i': 7 }}></span>
        </div>

        <div className="btn-box btns">
          <button type="submit" className="btn">
            Submit
          </button>
          <span className="animate scroll" style={{ '--i': 9 }}></span>
        </div>

        {status && (
          <p style={{ marginTop: '15px', color: status.includes('✅') ? '#00ff00' : '#ff4444', fontWeight: 'bold' }}>
            {status}
          </p>
        )}
      </form>
    </section>
  );
}
