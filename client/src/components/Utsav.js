import React, { useEffect, useRef, useState } from 'react';

const Utsav = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with middle item (Kojagiri Purnima)
  const galleryRef = useRef(null);

  const festivals = [
    {
      name: 'Navratri',
      image: '/images/Navratri.jpg',
      description: 'Nine nights of devotion celebrating the divine feminine energy'
    },
    {
      name: 'Kojagiri Purnima',
      image: '/images/Kojagiri_purnima.jpg',
      description: 'A sacred full moon celebration of abundance and prosperity'
    },
    {
      name: 'Tripurari Purnima',
      image: '/images/tripurari_purnima.webp',
      description: 'The divine victory of light over darkness'
    },
    {
      name: 'Pranpratishthapana Din Sohala',
      image: '/images/pranpratisthapana.jpg',
      description: 'Celebration of the sacred pranpratishthapana ceremony of the deity'
    },
    {
      name: 'Mahashivratri',
      image: '/images/mahashivratri.jpg',
      description: 'A night of deep devotion to Lord Shiva with special pooja and chanting'
    },
    {
      name: 'Guru Pornima',
      image: '/images/Gurupurnima.jpg',
      description: 'A day dedicated to expressing gratitude to Gurus and spiritual masters'
    },
    {
      name: 'Gajanan Maharaj Palkhi Sohala',
      image: '/images/gajanan_maharaj_palkhi.avif',
      description: 'Devotional palkhi procession in honor of Shri Gajanan Maharaj'
    }
  ];


  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? festivals.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === festivals.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;

    const activeCard = container.children[currentIndex];
    if (!activeCard) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();

    const targetScrollLeft =
      container.scrollLeft +
      (cardRect.left - containerRect.left) -
      (containerRect.width - cardRect.width) / 2;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
  }, [currentIndex]);

  return (
    <section className="utsav-section">
      <div className="container">
        <div className="utsav-header">
          <p className="utsav-label">UPCOMING EVENTS</p>
          <h2 className="utsav-title">Experience the Sacred Celebration of Divinity</h2>
          <p className="utsav-description">
            Join us in celebrating the divine festivals that bring together devotees from all walks of life. 
            Experience the spiritual energy of <strong>Navratri</strong>, the auspicious <strong>Kojagiri Purnima</strong>, 
            the sacred <strong>Tripurari Purnima</strong>, and many other important utsav throughout the year. 
            These celebrations mark significant moments in our spiritual calendar, offering opportunities for prayer, devotion, and divine blessings.
          </p>
        </div>
        <div className="utsav-gallery-container">
          <button className="gallery-btn gallery-btn-prev" onClick={goToPrevious} aria-label="Previous">
            ‹
          </button>
          <div className="utsav-gallery" ref={galleryRef}>
            {festivals.map((festival, index) => (
              <div
                key={index}
                className={`utsav-card ${index === currentIndex ? 'active' : ''}`}
              >
                <div className="utsav-image-wrapper">
                  <img
                    src={festival.image}
                    alt={festival.name}
                    className="utsav-image"
                  />
                </div>
                <div className="utsav-card-label">
                  <span className="utsav-festival-name">{festival.name.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="gallery-btn gallery-btn-next" onClick={goToNext} aria-label="Next">
            ›
          </button>
          <div className="gallery-indicators">
            {festivals.map((_, index) => (
              <button
                key={index}
                className={`gallery-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Utsav;

