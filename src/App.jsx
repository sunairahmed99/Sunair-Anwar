import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Education from './components/Education.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('selected-theme') || 'default';
  });
  
  const [activeSection, setActiveSection] = useState('home');
  const [isSticky, setIsSticky] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  
  const [visibleSections, setVisibleSections] = useState({
    home: true,
    education: false,
    skills: false,
    projects: false,
    contact: false
  });

  // Apply and persist theme
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    if (newTheme === 'default') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', newTheme);
    }
    localStorage.setItem('selected-theme', newTheme);
  };

  useEffect(() => {
    // Sync theme on initial load
    if (theme === 'default') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // Scroll spy & event handling
  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.scrollingElement?.scrollHeight || document.body.scrollHeight;

      // Sticky header trigger
      const nextSticky = top > 100;
      if (nextSticky !== isSticky) {
        setIsSticky(nextSticky);
      }

      // Check section views
      const sections = ['home', 'education', 'skills', 'projects', 'contact'];
      let nextActive = activeSection;
      let changed = false;
      const nextVisible = { ...visibleSections };

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const offset = el.offsetTop - 150;
          const height = el.offsetHeight;

          const isInView = top >= offset && top < offset + height;
          
          if (isInView) {
            nextActive = id;
          }

          if (nextVisible[id] !== isInView) {
            nextVisible[id] = isInView;
            changed = true;
          }
        }
      });

      // Keep Home visible on first load or if scrolling up past sections
      if (!nextVisible['home'] && top < 100) {
        nextVisible['home'] = true;
        changed = true;
      }

      if (nextActive !== activeSection) {
        setActiveSection(nextActive);
      }

      if (changed) {
        setVisibleSections(nextVisible);
      }

      // Check if scrolled to bottom for footer animation
      const scrolledToBottom = windowHeight + top >= scrollHeight - 30;
      if (scrolledToBottom !== isFooterVisible) {
        setIsFooterVisible(scrolledToBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, isSticky, isFooterVisible, visibleSections]);

  // Smooth scroll logic helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Header
        activeSection={activeSection}
        theme={theme}
        setTheme={setTheme}
        isSticky={isSticky}
        scrollToSection={scrollToSection}
      />
      
      <Home showAnimate={visibleSections.home} scrollToSection={scrollToSection} />
      
      <Education showAnimate={visibleSections.education} />
      
      <Skills showAnimate={visibleSections.skills} />
      
      <Projects showAnimate={visibleSections.projects} />
      
      <Contact showAnimate={visibleSections.contact} />
      
      <Footer showAnimate={isFooterVisible} scrollToSection={scrollToSection} />
    </>
  );
}
