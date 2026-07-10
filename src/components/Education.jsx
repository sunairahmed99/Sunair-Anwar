import React from 'react';

const educationData = [
  {
    year: '2019',
    title: 'Matriculation (Science) — S.M. Public School',
    description: 'Completed Matriculation in Science with an outstanding A+ Grade, building a strong foundation in mathematics and sciences.'
  },
  {
    year: '2021',
    title: 'Intermediate — Govt. Delhi College',
    description: 'Completed Intermediate studies achieving an A Grade, developing analytical thinking and problem-solving skills essential for computer science.'
  },
  {
    year: '2022 - 2025',
    title: 'Advanced Software Engineering (Diploma) — Aptech Learning Pakistan',
    description: 'Completed an Advanced Software Engineering Diploma with A Grade, gaining hands-on expertise in full-stack web development, MERN Stack, Next.js, WebSockets, and payment gateway integrations.'
  },
  {
    year: '2022 - 2026',
    title: 'Bachelor of Science in Computer Science (BSCS) — University of Karachi, UBIT',
    description: 'Currently pursuing BSCS from University of Karachi (UBIT), deepening knowledge in data structures, algorithms, software engineering, database systems, and modern web technologies.'
  }
];

export default function Education({ showAnimate }) {
  return (
    <section className={`education ${showAnimate ? 'show-animate' : ''}`} id="education">
      <h2 className="heading">
        My <span>Journey</span>
        <span className="animate scroll" style={{ '--i': 1 }}></span>
      </h2>

      <div className="education-row">
        <div className="education-column">
          <h3 className="title">
            Education<span className="animate scroll" style={{ '--i': 2 }}></span>
          </h3>

          <div className="education-box">
            {educationData.map((item, idx) => (
              <div className="education-content" key={idx}>
                <div className="content">
                  <div className="year">
                    <i className="bx bxs-calendar"></i> {item.year}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
            <span className="animate scroll" style={{ '--i': 3 }}></span>
          </div>
        </div>
      </div>
    </section>
  );
}
