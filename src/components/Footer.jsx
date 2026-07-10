import React from 'react';

export default function Footer({ showAnimate, scrollToSection }) {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    scrollToSection('home');
  };

  return (
    <footer className={`footer ${showAnimate ? 'show-animate' : ''}`}>
      <div className="footer-text">
        <p>
          Copyright &copy; 2026 | Designed and Maintained by Sunair Anwar | All Rights Reserved
        </p>
        <span className="animate scroll" style={{ '--i': 1 }}></span>
      </div>

      <div className="footer-iconTop">
        <a href="#home" onClick={handleScrollToTop}>
          <i className="bx bx-up-arrow-alt"></i>
        </a>
        <span className="animate scroll" style={{ '--i': 3 }}></span>
      </div>
    </footer>
  );
}
