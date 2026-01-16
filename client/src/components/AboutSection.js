import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeviCarousel from './DeviCarousel';

const AboutSection = () => {
  const navigate = useNavigate();

  const handleReadHistory = (e) => {
    e.preventDefault();
    navigate('/about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <div className="about-text">
          <p className="section-label">ABOUT THE TEMPLE</p>
          <h2 className="section-title">Trishakti Peeth - The Divine Heritage of Amravati</h2>
          <p className="section-description">
            "3 Shakti Peeth" usually refers to the popular pilgrimage circuit in Maharashtra, India, featuring three and a half sacred sites: Mahakali (Chandrapur) Aai, Tulja Bhavani (Tuljapur), Mahalakshmi Aai, known for their significance in the legend of Goddess Sati, where body parts fell, making them powerful seats of divine energy (Shakti).
          </p>
        </div>
        <DeviCarousel />
        <div className="read-history-container">
          <button className="read-history-btn" onClick={handleReadHistory}>
            Read Full History
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

