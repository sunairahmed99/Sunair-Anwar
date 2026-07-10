import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const DRIVE = {
  zameenUser: 'https://drive.google.com/file/d/1M-h8qJEx5kYXin3Jm1kQ124VXfO7MDE7/preview',
  zameenSeller: 'https://drive.google.com/file/d/1VWiI7wSkQwyjMQ2LLIj4AG9L6O3odAT_/preview',
  zameenAdmin: 'https://drive.google.com/file/d/1PiRAAH_zbE7Qq6Lgpl2yMbgN0O3UGj3U/preview',
  eventUser: 'https://drive.google.com/file/d/1O11aepenKxRDIjpCycpNQDRBrLycJL3q/preview',
  eventAdmin: 'https://drive.google.com/file/d/15I04IOn20ldt1xHrADPuDTj4lYDjyYpk/preview',
  restaurantUser: 'https://drive.google.com/file/d/1zSRk8Qcg4am4gD8Uro2QCKHpbKcz3E3-/preview',
  restaurantAdmin: 'https://drive.google.com/file/d/1qq3LGYPcRXE2S9fCir4ZIWuVGV3EPrxf/preview',
  nextRestaurantUser: 'https://drive.google.com/file/d/1i2ItzBs0sxpYI-1PyA9lsDNrQPWqH0ot/preview',
  nextRestaurantAdmin: 'https://drive.google.com/file/d/1-tfnHpUUNx-EyaOz9TQP-mQ6GgpQuyMR/preview',
  nextShopUser: 'https://drive.google.com/file/d/11gHTF9fcX_c2cmzue0uzwNKVR9eIYK7L/preview',
  nextShopAdmin: 'https://drive.google.com/file/d/1xUBwpmDJG_mU6eRmtbV96mmN3u_KNabu/preview',
  ecommerceUser: 'https://drive.google.com/file/d/17TcdSjYmPO2MObbJdvRU6RCIlbYiXT35/preview',
  ecommerceSeller: 'https://drive.google.com/file/d/1PdrgU0UhfNTzpCAQEwksgnt__Bi62wLD/preview',
  ecommerceAdmin: 'https://drive.google.com/file/d/1yP0wOgVetS3HBMM1znQ54dgK5DB7SQaE/preview',
  youtube: 'https://drive.google.com/file/d/1woF_dAfQerSz_n12EQJlV0Fn2lInSbj6/preview',
};

// Sequential background preloader to load Google Drive files one by one
function PreloadAllVideos() {
  const [loadedCount, setLoadedCount] = useState(0);
  const urls = Object.values(DRIVE);

  useEffect(() => {
    if (loadedCount < urls.length) {
      const timer = setTimeout(() => {
        setLoadedCount(prev => prev + 1);
      }, 700); // Load next video after 700ms in the background
      return () => clearTimeout(timer);
    }
  }, [loadedCount, urls.length]);

  return (
    <div style={{ position: 'fixed', opacity: 0, pointerEvents: 'none', width: 0, height: 0, overflow: 'hidden', zIndex: -9999 }}>
      {urls.slice(0, loadedCount).map((src, i) => (
        <iframe key={i} src={src} title={`preload-${i}`} allow="autoplay" />
      ))}
    </div>
  );
}

function DriveVideo({ src }) {
  const [open, setOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = React.useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' } // Load iframes 300px before they enter viewport
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Card preview iframe with Lazy Loading */}
      <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', background: '#081b29', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {shouldRender ? (
          <iframe
            src={src}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            allow="autoplay"
            title="Project Demo Video"
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'var(--main-color)' }}>
            <i className="bx bx-loader-alt bx-spin" style={{ fontSize: '3.5rem' }}></i>
            <span style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>Loading Preview...</span>
          </div>
        )}
        
        {/* Transparent click overlay */}
        <div
          onClick={() => setOpen(true)}
          title="Click to fullscreen"
          style={{
            position: 'absolute', inset: 0, cursor: 'pointer', zIndex: 2,
            background: 'transparent',
          }}
        />
      </div>

      {/* Fullscreen Modal via Portal — renders at body level, never clipped */}
      {open && ReactDOM.createPortal(
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            width: '100vw', height: '100vh',
            zIndex: 999999,
            background: 'rgba(0,0,0,0.93)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute', top: '1.5rem', right: '2rem',
              background: 'transparent', border: 'none', color: '#fff',
              fontSize: '3.5rem', cursor: 'pointer', lineHeight: 1,
            }}
          >✕</button>

          {/* Video */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '90vw', height: '85vh',
              borderRadius: '1rem', overflow: 'hidden',
              boxShadow: '0 0 80px rgba(0,0,0,0.9)',
            }}
          >
            <iframe
              src={src}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Project Video Fullscreen"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

const btn = {
  display: 'inline-flex', justifyContent: 'center', alignItems: 'center',
  width: '12rem', height: '4rem', borderRadius: '0.8rem',
  fontSize: '1.5rem', fontWeight: '600', transition: '0.3s ease', textDecoration: 'none',
};


const projectsData = [
  {
    projectTitle: 'SaaS-Based "Apni Zameen" Project',
    projectDesc: 'Apni Zameen is a scalable SaaS-based real estate platform built with the MERN stack, supporting 200,000+ optimized property listings with high performance. It features advanced property search, lead generation, and secure JWT-based authentication and role-based authorization. The platform integrates Socket.IO for real-time live chat and an AI chatbot to enhance user engagement.',
    cards: [
      { title: 'Zameen - User Portal', video: DRIVE.zameenUser, liveLink: 'https://apni-zameen-frontend.vercel.app/', githubLink: 'https://github.com/sunairahmed99/ApniZameenFrontend', description: 'A modern, dynamic user platform for browsing premium properties, applying detailed search filters, viewing listings, and interacting with seller agents.', delayIndex: 2 },
      { title: 'Zameen - Seller Portal', video: DRIVE.zameenSeller, liveLink: 'https://apni-zameen-frontend.vercel.app/', githubLink: 'https://github.com/sunairahmed99/ApniZameenFrontend', description: 'A comprehensive seller interface to add and manage property listings, upload marketing media, monitor inquiries, and keep track of leads.', delayIndex: 3 },
      { title: 'Zameen - Admin Dashboard', video: DRIVE.zameenAdmin, liveLink: 'https://apni-zameen-frontend.vercel.app/', githubLink: 'https://github.com/sunairahmed99/ApniZameenFrontend', description: 'An executive control center for platform administration: managing user accounts, listing moderation, security controls, and detailed analytics.', delayIndex: 4 },
    ]
  },
  {
    projectTitle: 'SaaS-Based "Multi-Vendor E-Commerce" Project',
    projectDesc: 'A fully-featured SaaS-based multi-vendor e-commerce platform built with the MERN stack. It leverages WebSockets for real-time notifications and chat, integrates secure payment gateways (Stripe/PayPal), and features optimized query handling for large inventories.',
    cards: [
      { title: 'E-Commerce - User Panel', video: DRIVE.ecommerceUser, liveLink: 'https://saas-based-ecommerce-website-fronte.vercel.app/', githubLink: 'https://github.com/sunairahmed99/Saas-Based-Ecommerce-Website-Frontend', description: 'An intuitive user storefront allowing customers to search/filter products, manage their cart, make secure purchases via payment gateways, and message sellers in real-time.', delayIndex: 2 },
      { title: 'E-Commerce - Seller Panel', video: DRIVE.ecommerceSeller, liveLink: 'https://saas-based-ecommerce-website-fronte.vercel.app/', githubLink: 'https://github.com/sunairahmed99/Saas-Based-Ecommerce-Website-Frontend', description: 'A dedicated dashboard for sellers to manage products, process order requests, view revenue graphs, track inventory levels, and handle customer service chat.', delayIndex: 3 },
      { title: 'E-Commerce - Admin Dashboard', video: DRIVE.ecommerceAdmin, liveLink: 'https://saas-based-ecommerce-website-fronte.vercel.app/', githubLink: 'https://github.com/sunairahmed99/Saas-Based-Ecommerce-Website-Frontend', description: 'A comprehensive admin suite to monitor site performance, manage user/vendor disputes, moderate product uploads, track payouts, and configure global store settings.', delayIndex: 4 },
    ]
  },
  {
    projectTitle: '"Event Management" Project',
    projectDesc: 'A powerful event booking and management SaaS platform built with the MERN stack. It allows seamless ticket purchases, event creation, real-time schedule tracking, and detailed seat bookings with secure payment processing.',
    cards: [
      { title: 'Event - User Portal', video: DRIVE.eventUser, liveLink: 'https://event-planning-frontend.vercel.app/', githubLink: 'https://github.com/sunairahmed99/Event_planning_frontend', description: 'An elegant customer portal enabling users to explore upcoming events, view schedules, book tickets, select seating, and handle payments securely.', delayIndex: 2 },
      { title: 'Event - Admin Dashboard', video: DRIVE.eventAdmin, liveLink: 'https://event-planning-frontend.vercel.app/', githubLink: 'https://github.com/sunairahmed99/Event_planning_frontend', description: 'A central control board for organizers and system admins to approve event requests, track ticket sales metrics, manage venue maps, and moderate users.', delayIndex: 3 },
    ]
  },
  {
    projectTitle: '"Restaurant Management" Project',
    projectDesc: 'A comprehensive food ordering and restaurant management SaaS platform built with the MERN stack. It offers dynamic food menu customization, real-time table booking, online food delivery, and secure payment processing.',
    cards: [
      { title: 'Restaurant - User Portal', video: DRIVE.restaurantUser, liveLink: 'https://resturant-frontendd.vercel.app/', githubLink: 'https://github.com/sunairahmed99/Resturant_frontendd', description: 'An interactive user application for exploring the restaurant menu, placing orders online, scheduling reservations, and tracking orders in real-time.', delayIndex: 2 },
      { title: 'Restaurant - Admin Dashboard', video: DRIVE.restaurantAdmin, liveLink: 'https://resturant-frontendd.vercel.app/', githubLink: 'https://github.com/sunairahmed99/Resturant_frontendd', description: 'A robust management dashboard for restaurant staff to update menus, manage digital tables, process payments, and track order fulfillment.', delayIndex: 3 },
    ]
  },
  {
    projectTitle: '"YouTube Clone" Project',
    projectDesc: 'A video-sharing and live streaming platform clone built with the MERN stack featuring modern media player integration, customized search feeds by categories, interactive channel views, and related videos recommendation.',
    cards: [
      { title: 'YouTube Clone - Video Feed & Player', video: DRIVE.youtube, liveLink: 'https://youtube-one-lyart.vercel.app/', githubLink: 'https://github.com/sunairahmed99/youtube', description: 'A fully styled responsive front-end clone of YouTube, featuring custom video playback, category filters, sidebar navigation, dynamic feed retrieval, channel details, and related videos.', delayIndex: 2 },
    ]
  },
];

function ProjectCard({ card }) {
  return (
    <div className="project-card">
      <div className="project-img" style={{ height: '22rem', position: 'relative', overflow: 'hidden' }}>
        <DriveVideo src={card.video} />
      </div>
      <div className="project-content" style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
        <div className="project-btn-box" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: 'auto', paddingTop: '2.5rem' }}>
          <a href={card.liveLink} target="_blank" rel="noopener noreferrer"
            style={{ ...btn, background: 'var(--main-color)', border: '0.2rem solid var(--main-color)', color: 'var(--bg-color)' }}
            onMouseOver={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--main-color)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'var(--main-color)'; e.currentTarget.style.color = 'var(--bg-color)'; }}
          >Live Link</a>
          <a href={card.githubLink} target="_blank" rel="noopener noreferrer"
            style={{ ...btn, background: 'transparent', border: '0.2rem solid var(--main-color)', color: 'var(--main-color)' }}
            onMouseOver={e => { e.currentTarget.style.background = 'var(--main-color)'; e.currentTarget.style.color = 'var(--bg-color)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--main-color)'; }}
          >GitHub</a>
        </div>
      </div>
      <span className="animate scroll" style={{ '--i': card.delayIndex + 1 }}></span>
    </div>
  );
}

export default function Projects({ showAnimate }) {
  return (
    <section className={`projects ${showAnimate ? 'show-animate' : ''}`} id="projects">
      <PreloadAllVideos />

      {/* ========== NEXTJS PROJECTS ========== */}
      <h2 className="heading" style={{ marginBottom: '4rem' }}>
        Nextjs Full Stack <span>Projects</span>
        <span className="animate scroll" style={{ '--i': 1 }}></span>
      </h2>

      {/* Next Restaurant */}
      <div className="project-group" style={{ marginBottom: '8rem', position: 'relative' }}>
        <div className="project-intro" style={{ textAlign: 'center', maxWidth: '80rem', margin: '-1rem auto 5rem', padding: '0 2rem' }}>
          <h3 style={{ fontSize: '2.8rem', color: 'var(--main-color)', marginBottom: '1.5rem', fontWeight: '700' }}>Next Restaurant</h3>
          <p style={{ fontSize: '1.6rem', color: 'var(--text-color)', lineHeight: '1.8', opacity: '0.85' }}>A full-stack Next.js restaurant platform with online ordering, dynamic menu management, real-time table booking, and a powerful admin dashboard.</p>
          <span className="animate scroll" style={{ '--i': 1.5 }}></span>
        </div>
        <div className="projects-container" style={{ position: 'relative' }}>
          {[
            { title: 'Next Restaurant - User Portal', video: DRIVE.nextRestaurantUser, liveLink: 'https://resturent-project-opal.vercel.app/', githubLink: 'https://github.com/sunairahmed99/ResturentProject', description: 'An interactive user application built with Next.js for exploring the restaurant menu, placing orders online, scheduling reservations, and tracking orders in real-time.', delayIndex: 2 },
            { title: 'Next Restaurant - Admin Dashboard', video: DRIVE.nextRestaurantAdmin, liveLink: 'https://resturent-project-opal.vercel.app/', githubLink: 'https://github.com/sunairahmed99/ResturentProject', description: 'A robust Next.js admin dashboard for restaurant staff to update menus, manage digital tables, process payments, and track order fulfillment in real-time.', delayIndex: 3 },
          ].map((card, i) => <ProjectCard key={i} card={card} />)}
        </div>
      </div>

      {/* Next Shop */}
      <div className="project-group" style={{ marginBottom: '10rem', position: 'relative' }}>
        <div className="project-intro" style={{ textAlign: 'center', maxWidth: '80rem', margin: '-1rem auto 5rem', padding: '0 2rem' }}>
          <h2 className="heading" style={{ marginBottom: '2rem' }}>Ecommerce <span>Projects</span><span className="animate scroll" style={{ '--i': 1 }}></span></h2>
          <p style={{ fontSize: '1.6rem', color: 'var(--text-color)', lineHeight: '1.8', opacity: '0.85' }}>A full-stack Next.js ecommerce platform featuring product browsing, cart management, secure checkout, and a comprehensive admin panel.</p>
          <span className="animate scroll" style={{ '--i': 1.5 }}></span>
        </div>
        <div className="projects-container" style={{ position: 'relative' }}>
          {[
            { title: 'Next Shop - User Portal', video: DRIVE.nextShopUser, liveLink: 'https://next-shop-ecommerce-p-latform.vercel.app/', githubLink: 'https://github.com/sunairahmed99/NextShop-Ecommerce-PLatform', description: 'A sleek Next.js shopping portal for browsing products, managing cart, applying filters, and completing secure checkout with real-time order tracking.', delayIndex: 2 },
            { title: 'Next Shop - Admin Dashboard', video: DRIVE.nextShopAdmin, liveLink: 'https://next-shop-ecommerce-p-latform.vercel.app/', githubLink: 'https://github.com/sunairahmed99/NextShop-Ecommerce-PLatform', description: 'A powerful Next.js admin dashboard for managing products, categories, orders, inventory, and generating detailed sales analytics reports.', delayIndex: 3 },
          ].map((card, i) => <ProjectCard key={i} card={card} />)}
        </div>
      </div>

      {/* ========== MERN PROJECTS ========== */}
      <h2 className="heading" style={{ marginBottom: '4rem' }}>
        MERN <span>Projects</span>
        <span className="animate scroll" style={{ '--i': 1 }}></span>
      </h2>

      {projectsData.map((project, pIdx) => (
        <div key={pIdx} className="project-group" style={{ marginBottom: pIdx < projectsData.length - 1 ? '8rem' : '0', position: 'relative' }}>
          <div className="project-intro" style={{ textAlign: 'center', maxWidth: '80rem', margin: '-1rem auto 5rem', padding: '0 2rem' }}>
            <h3 style={{ fontSize: '2.8rem', color: 'var(--main-color)', marginBottom: '1.5rem', fontWeight: '700' }}>{project.projectTitle}</h3>
            <p style={{ fontSize: '1.6rem', color: 'var(--text-color)', lineHeight: '1.8', opacity: '0.85' }}>{project.projectDesc}</p>
            <span className="animate scroll" style={{ '--i': 1.5 }}></span>
          </div>
          <div className="projects-container" style={{ position: 'relative' }}>
            {project.cards.map((card, i) => <ProjectCard key={i} card={card} />)}
          </div>
        </div>
      ))}
    </section>
  );
}
