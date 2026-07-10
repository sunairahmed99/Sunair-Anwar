import React from 'react';

export default function Home({ showAnimate, scrollToSection }) {
  const handleContactClick = (e) => {
    e.preventDefault();
    scrollToSection('contact');
  };

  return (
    <section className={`home ${showAnimate ? 'show-animate' : ''}`} id="home">
      <div className="home-content">
        <h1>
          Hi, I'm <span>Sunair Anwar</span>
          <span className="animate" style={{ '--i': 2 }}></span>
        </h1>
        <div className="text-animate">
          <h3>Full Stack Web & Mobile App Developer</h3>
          <span className="animate" style={{ '--i': 3 }}></span>
        </div>
        <p>
          I'm Sunair Anwar — a Full Stack Web and Mobile App Developer, Freelancer, and Academic Leader with 2+ years of experience in software engineering, training, and education management.
          <br /><br />
          I am highly proficient in the MERN Stack, Next.js, .NET, and core computer science concepts. I have progressed from Junior Faculty to Center Academic Head, successfully guiding academic delivery and mentoring engineering students.
          <br /><br />
          I specialize in building, launching, and deploying high-quality, scalable freelance web and mobile applications, combining clean design, robust functionality, and optimized deployment workflows.
          <span className="animate" style={{ '--i': 4 }}></span>
        </p>

        <div className="btn-box">
          <a href="#contact" className="btn" onClick={handleContactClick}>
            Hire Me
          </a>
          <a href="#contact" className="btn" onClick={handleContactClick}>
            Let's Talk
          </a>
          <a href="/Sunair_Anwar.pdf" target="_blank" rel="noopener noreferrer" className="btn">
            Download CV
          </a>
          <span className="animate" style={{ '--i': 5 }}></span>
        </div>
      </div>

      <div className="home-sci">
        <a href="https://www.linkedin.com/in/sunair-ahmed-2036b2226/" target="_blank" rel="noopener noreferrer">
          <i className="bx bxl-linkedin"></i>
        </a>
        <a href="https://github.com/sunairahmed99" target="_blank" rel="noopener noreferrer">
          <i className="bx bxl-github"></i>
        </a>
        <span className="animate" style={{ '--i': 6 }}></span>
      </div>

      <div className="home-img-wrapper">
        <div className="home-img-inner"></div>
        <span className="animate home-img" style={{ '--i': 7 }}></span>
      </div>
    </section>
  );
}
