import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleFooterLinkClick = (e, section) => {
    e.preventDefault();
    
    if (section === 'about') {
      navigate('/about');
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
    <>
      <footer className="footer" id="contact">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="footer-temple-icon">
                  <img src="/images/temple_new_logo1.png" alt="Temple Logo" className="footer-logo-img" />
                </div>
                <div className="footer-logo-text">
                  <h3>श्री त्रिपुरा त्रिशक्ति पीठ</h3>
                  <p>विरूळ रोंघे, अमरावती</p>
                </div>
              </div>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Contact Us</h4>
              <div className="contact-info">
                <p className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>Address: Virul Ronghe, Amravati, Maharashtra 444709</span>
                </p>
                <p className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>Phone: +91-7775072111</span>
                </p>
                <p className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span>Email: info@trishaktipeeth.org</span>
                </p>
              </div>
            </div>
            <div className="footer-section">
              <div className="map-container">
                <iframe
                  title="Temple Location"
                  src="https://www.google.com/maps?q=त्रि+शक्ति+पीठ+(+TRI+SHAKTI+PEETH+)&hl=en&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="social-icons">
                <a href="#" className="social-icon facebook" aria-label="Facebook">
                  f
                </a>
                <a href="#" className="social-icon twitter" aria-label="Twitter">
                  X
                </a>
                <a href="#" className="social-icon youtube" aria-label="YouTube">
                  ▶
                </a>
                <a href="#" className="social-icon instagram" aria-label="Instagram">
                  📷
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>©2025 Trishakti Peeth | All rights reserved</p>
          </div>
        </div>
      </footer>
      {showScrollTop && (
        <button
          className="scroll-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default Footer;

