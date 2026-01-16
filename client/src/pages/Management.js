import React from 'react';

const Management = () => {
  const trustees = [
    { name: 'Dadashaheb Narsingao Kadam', role: 'President' },
    { name: 'Vasant Daulatrao Vatane', role: 'Vice President' },
    { name: 'Anup Sudhakar Sawant', role: 'Secretary' },
    { name: 'Ganesh Marotrao Kadge', role: 'Treasurer' },
    { name: 'Sanjay Daulatrao Sawant', role: 'Trustee' },
    { name: 'Vijay Panjabrao Masne', role: 'Trustee' },
    { name: 'Brijmohan Nemichanji Katta', role: 'Trustee' }
  ];

  return (
    <>
      {/* Hero Image Section */}
      <section className="about-hero-section">
        <div className="about-hero-image">
          <img src="/images/temple_image.png" alt="Temple" className="about-hero-img" />
          <div className="about-hero-overlay">
            <h1 className="about-hero-title">Management</h1>
          </div>
        </div>
      </section>

      {/* Management Committee Section */}
      <section className="aarti-section" id="management">
        <div className="container">
          <h2 className="aarti-title">Management Committee</h2>
          <div className="management-grid">
            {trustees.map((trustee, index) => (
              <div key={index} className="trustee-card">
                <div>
                  <h3 className="card-title">{trustee.name}</h3>
                  <p className="card-time">{trustee.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Management;
