import React from 'react';

const AboutUs = () => {
  return (
    <>
      {/* Hero Image Section */}
      <section className="about-hero-section">
        <div className="about-hero-image">
          <img src="/images/temple_image.png" alt="Temple" className="about-hero-img" />
          <div className="about-hero-overlay">
            <h1 className="about-hero-title">About Us</h1>
          </div>
        </div>
      </section>

      {/* About Temple Section */}
      <section className="about-temple-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <p className="section-label">ABOUT THE TEMPLE</p>
              <h2 className="section-title">Trishakti Peeth - The Divine Heritage of Amravati</h2>
              <p className="section-description">
                "3 Shakti Peeth" usually refers to the popular pilgrimage circuit in Maharashtra, India, featuring three and a half sacred sites: Mahakali (Chandrapur) Aai, Tulja Bhavani (Tuljapur), Mahalakshmi Aai, known for their significance in the legend of Goddess Sati, where body parts fell, making them powerful seats of divine energy (Shakti).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Goddess Section */}
      <section className="about-goddess-section">
        <div className="container">
          <h2 className="goddess-section-title">About The Goddesses</h2>
          <p className="goddess-intro">
            Trishakti Peeth is the sacred temple where Mata Mahakali, Mata Mahalaxmi, and Mata Bhavani are worshipped together. This unique trinity represents strength, wealth, and protection. Devotees come here to seek blessings from all three divine forms in one sacred place. Experience complete spiritual harmony at this one-of-a-kind temple.
          </p>

          {/* Mahakali */}
          <div className="goddess-card">
            <div className="goddess-image-wrapper">
              <img src="/images/devi_image_new1.jpg" alt="Shri Mahakali Mata" className="goddess-image" />
            </div>
            <div className="goddess-content">
              <h3 className="goddess-name">Shri Mahakali Mata</h3>
              <p className="goddess-description">
                Mahakali, also known as Great Kali, is the Hindu goddess of time and death. She is considered the wife of Mahakala, the god of consciousness, who represents the foundation of reality and existence. In Sanskrit, "Mahakali" is the feminine form of "Mahakala," an epithet of Lord Shiva. Mahakali represents Adi Parashakti, the supreme energy that exists beyond time and space. Kali, as a form of Adi Parashakti, symbolizes divine anger and destruction of evil. She is also worshipped as the Divine Mother by many Hindus. In her four-armed form, Mahakali is shown holding a sword, a trishul (trident), a severed head, and a bowl or skull-cup (kapala) to collect the blood. Her eyes are red with intensity, her hair is messy, and her tongue hangs out of her mouth.
                


              </p>
            </div>
          </div>

          {/* Bhavani */}
          <div className="goddess-card">
            <div className="goddess-image-wrapper">
              <img src="/images/devi_image_new2.jpg" alt="Shree Bhavani Aai" className="goddess-image" />
            </div>
            <div className="goddess-content">
              <h3 className="goddess-name">Shree Bhavani Aai</h3>
              <p className="goddess-description">
                Bhavani Aai (Mother Bhavani) refers to the powerful Hindu Goddess Bhavani, a fierce, protective form of Durga, most famously worshipped at the Tulja Bhavani Temple in Tuljapur, Maharashtra, as the guardian deity (Kuldevi) of Maratha King Shivaji Maharaj, symbolizing strength, justice, and maternal protection, with popular songs and devotion surrounding her as the ultimate mother goddess.
              </p>
            </div>
          </div>

          {/* Mahalaxmi */}
          <div className="goddess-card">
            <div className="goddess-image-wrapper">
              <img src="/images/devi_image_new3.jpg" alt="Shri Mahalaxmi Mata" className="goddess-image" />
            </div>
            <div className="goddess-content">
              <h3 className="goddess-name">Shri Mahalaxmi Mata</h3>
              <p className="goddess-description">
                'Lakshmi' is a Sanskrit word that comes from the root 'laks', which means to perceive or observe. It is related to the word laksya, meaning aim or objective. Goddess Laxmi has many names. Along with celebrating the autumn season, she is worshipped during Diwali festival. Laxmi is strongly connected to the lotus flower, and many of her names reflect this—such as Padmā, Kamalā, and Padmahastā. Other names include Manushri, Chakrika, Kamalika, Aishwarya, Lalima, Kalyani, Nandika, Rujula, Vaishnavi, Samruddhi, Narayani, Bhargavi, Sridevi, Chanchala, Jalaja, Madhavi, Sujata, and Shreya. During Navratri, devotees offer food and sweets to her and chant her name 108 times as a form of devotion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;

