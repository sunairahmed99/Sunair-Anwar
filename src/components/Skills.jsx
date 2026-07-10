import React from 'react';

const codingSkills = [
  { name: 'JavaScript (ES6+)', percent: 92 },
  { name: 'React.js', percent: 90 },
  { name: 'Next.js', percent: 85 },
  { name: 'Node.js', percent: 88 },
  { name: 'Express.js', percent: 87 },
  { name: 'MongoDB', percent: 85 },
  { name: 'HTML5 & CSS3', percent: 93 },
  { name: 'TailwindCSS', percent: 88 },
  { name: 'TypeScript', percent: 72 }
];

const professionalSkills = [
  { name: 'Full Stack Development', percent: 88 },
  { name: 'REST API Design', percent: 87 },
  { name: 'Socket.IO (WebSockets)', percent: 82 },
  { name: 'Payment Gateway Integration', percent: 80 },
  { name: 'JWT Authentication', percent: 88 },
  { name: 'UI/UX Design', percent: 80 },
  { name: 'Git & GitHub', percent: 85 },
  { name: 'Problem Solving', percent: 88 }
];

export default function Skills({ showAnimate }) {
  return (
    <section className={`skills ${showAnimate ? 'show-animate' : ''}`} id="skills">
      <h2 className="heading">
        My <span>Skills</span>
        <span className="animate scroll" style={{ '--i': 1 }}></span>
      </h2>

      <div className="skills-row">
        <div className="skills-column">
          <h3 className="title">
            Coding Skills<span className="animate scroll" style={{ '--i': 2 }}></span>
          </h3>

          <div className="skills-box">
            <div className="skills-content">
              {codingSkills.map((skill, idx) => (
                <div className="progress" key={idx}>
                  <h3>
                    {skill.name} <span>{skill.percent}%</span>
                  </h3>
                  <div className="bar">
                    <span style={{ width: `${skill.percent}%` }}></span>
                  </div>
                </div>
              ))}
            </div>
            <span className="animate scroll" style={{ '--i': 3 }}></span>
          </div>
        </div>

        <div className="skills-column">
          <h3 className="title">
            Professional Skills<span className="animate scroll" style={{ '--i': 5 }}></span>
          </h3>

          <div className="skills-box">
            <div className="skills-content">
              {professionalSkills.map((skill, idx) => (
                <div className="progress" key={idx}>
                  <h3>
                    {skill.name} <span>{skill.percent}%</span>
                  </h3>
                  <div className="bar">
                    <span style={{ width: `${skill.percent}%` }}></span>
                  </div>
                </div>
              ))}
            </div>
            <span className="animate scroll" style={{ '--i': 6 }}></span>
          </div>
        </div>
      </div>
    </section>
  );
}
