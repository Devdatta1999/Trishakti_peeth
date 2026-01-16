import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Show white background when scrolled down a bit (not immediately)
      // This allows the transparent header to show over the hero image
      setIsScrolled(window.scrollY > 100);

      // On homepage, keep 'home' active throughout - don't change based on scroll
      // Active link only changes when user clicks on menu items
    };

    // Don't check initial scroll - start with transparent header
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Update active link based on current route
    if (location.pathname === '/about') {
      setActiveLink('about');
    } else if (location.pathname === '/management') {
      setActiveLink('management');
    } else if (location.pathname === '/volunteer') {
      setActiveLink('volunteer');
    } else if (location.pathname === '/donation') {
      setActiveLink('donation');
    } else if (location.pathname === '/') {
      // Always default to 'home' on homepage
      setActiveLink('home');
    }
  }, [location]);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    setActiveLink(section);

    if (section === 'about') {
      navigate('/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'management') {
      navigate('/management');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'volunteer') {
      navigate('/volunteer');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'donation') {
      navigate('/donation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'home') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(section);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Top row: Centered temple name */}
        <div className="header-top">
          <h1 className="temple-name">श्री त्रिपुरा त्रिशक्ति पीठ</h1>
        </div>

        {/* Bottom row: Logo, Menu, Donate button */}
        <div className="header-bottom">
          <div className="logo-section">
            <div className="temple-icon">
              <img src="/images/temple_new_logo1.png" alt="Temple Logo" className="temple-logo-img" />
            </div>
          </div>
          <nav className="nav-menu">
            <a
              href="#home"
              className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'home')}
            >
              Home
            </a>
            <a
              href="#about"
              className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About us
            </a>
            <a
              href="#management"
              className={`nav-link ${activeLink === 'management' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'management')}
            >
              Management
            </a>
            <a
              href="#volunteer"
              className={`nav-link ${activeLink === 'volunteer' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'volunteer')}
            >
              Volunteer
            </a>
            <a
              href="#donation"
              className={`nav-link ${activeLink === 'donation' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'donation')}
            >
              Donation
            </a>
            <a
              href="#contact"
              className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Contact Us
            </a>
          </nav>
          <button className="donate-btn" onClick={(e) => {
            e.preventDefault();
            navigate('/donation');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>Donate Now</button>
        </div>
      </div>
    </header>
  );
};

export default Header;

