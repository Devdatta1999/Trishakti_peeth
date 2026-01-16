import React, { useState } from 'react';

const DeviCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with middle item (Bhavani)

  const goddesses = [
    // {
    //   name: 'श्री महाकाली आई',
    //   image: '/images/devi_image_new1.jpg',
    // },
    {
      name: 'श्री भवानी आई',
      image: '/images/devi_image_new2.jpg',
    },
    {
      name: 'श्री महाकाली आई',
      image: '/images/devi_image_new1.jpg',
    },
    {
      name: 'श्री महालक्ष्मी आई',
      image: '/images/devi_image_new3.jpg',
    }
  ];

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? goddesses.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === goddesses.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="devi-carousel-container">
      <button className="gallery-btn gallery-btn-prev" onClick={goToPrevious} aria-label="Previous">
        ‹
      </button>
      <div className="devi-gallery">
        {goddesses.map((goddess, index) => (
          <div
            key={index}
            className={`devi-card ${index === currentIndex ? 'active' : ''}`}
          >
            <div className="devi-image-wrapper">
              <img
                src={goddess.image}
                alt={goddess.name}
                className="devi-image"
              />
            </div>
            <div className="devi-card-label">
              <span className="devi-name">{goddess.name.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="gallery-btn gallery-btn-next" onClick={goToNext} aria-label="Next">
        ›
      </button>
      <div className="gallery-indicators">
        {goddesses.map((_, index) => (
          <button
            key={index}
            className={`gallery-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DeviCarousel;

