import React, { useState } from 'react';

export default function Contact({ showAnimate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className={`contact ${showAnimate ? 'show-animate' : ''}`} id="contact">
      <h2 className="heading">
        Contact <span>Me</span>
        <span className="animate scroll" style={{ '--i': 1 }}></span>
      </h2>

      <form action="https://formspree.io/f/xvgqeeda" method="POST">
        <div className="input-box">
          <div className="input-field">
            <input
              type="text"
              name="Full Name"
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
              name="Email"
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
              name="Mobile Number"
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
              name="Email Subject"
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
            name="Message"
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
      </form>
    </section>
  );
}
