import React, { useState, useEffect, useRef } from 'react';

const themes = [
  { name: 'default', label: 'Default Dark', bg: '#081b29', border: '#00abf0' },
  { name: 'light', label: 'Light Mode', bg: '#f4f4f4', border: '#00abf0' },
  { name: 'purple', label: 'Midnight Purple', bg: '#1a0b2e', border: '#ff2a7a' },
  { name: 'forest', label: 'Forest Green', bg: '#051f0f', border: '#00ff88' },
  { name: 'sunset', label: 'Sunset Crimson', bg: '#2a0808', border: '#ffaa00' }
];

export default function Header({ activeSection, theme, setTheme, isSticky, scrollToSection }) {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const themeMenuRef = useRef(null);
  const themeBtnRef = useRef(null);

  // Close theme menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        themeMenuRef.current &&
        !themeMenuRef.current.contains(e.target) &&
        themeBtnRef.current &&
        !themeBtnRef.current.contains(e.target)
      ) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setIsThemeMenuOpen(false);
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    scrollToSection(targetId);
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`}>
      <a href="#home" className="logo" onClick={(e) => handleLinkClick(e, 'home')}>
        Sunair Dev <span className="animate" style={{ '--i': 1 }}></span>
      </a>

      <div className="theme-switcher">
        <i
          ref={themeBtnRef}
          className="bx bx-palette"
          id="theme-btn"
          onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
        ></i>
        <div ref={themeMenuRef} className={`theme-menu ${isThemeMenuOpen ? 'active' : ''}`}>
          {themes.map((t) => (
            <div
              key={t.name}
              className="theme-option"
              style={{ background: t.bg, border: `2px solid ${t.border}` }}
              title={t.label}
              onClick={() => handleThemeChange(t.name)}
            ></div>
          ))}
        </div>
      </div>

      <div
        className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'}`}
        id="menu-icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="animate" style={{ '--i': 2 }}></span>
      </div>

      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <a
          href="#home"
          className={activeSection === 'home' ? 'active' : ''}
          onClick={(e) => handleLinkClick(e, 'home')}
        >
          Home
        </a>
        <a
          href="#education"
          className={activeSection === 'education' ? 'active' : ''}
          onClick={(e) => handleLinkClick(e, 'education')}
        >
          Education
        </a>
        <a
          href="#skills"
          className={activeSection === 'skills' ? 'active' : ''}
          onClick={(e) => handleLinkClick(e, 'skills')}
        >
          Skills
        </a>
        <a
          href="#projects"
          className={activeSection === 'projects' ? 'active' : ''}
          onClick={(e) => handleLinkClick(e, 'projects')}
        >
          Projects
        </a>
        <a
          href="#contact"
          className={activeSection === 'contact' ? 'active' : ''}
          onClick={(e) => handleLinkClick(e, 'contact')}
        >
          Contact
        </a>

        <span className="active-nav"></span>
        <span className="animate" style={{ '--i': 2 }}></span>
      </nav>
    </header>
  );
}
