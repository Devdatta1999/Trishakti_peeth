import React from 'react';

const AartiSchedule = () => {
  const scheduleCards = [
    {
      icon: '/images/temple_icon.png',
      title: 'Temple Hours',
      time: '6:00 AM – 1:30 PM',
      highlight: false
    },
    {
      icon: '/images/mukhdarshan_icon.png',
      title: 'Darshan',
      time: '1:30 PM - 4:00 PM',
      highlight: false
    },
    {
      icon: '/images/temple_icon.png',
      title: 'Tuesday Baithak',
      time: '12:00 PM - 03:00 PM',
      highlight: false
    },
    {
      icon: '/images/aarati_icon.png',
      title: 'Morning Aarti',
      time: '7:15 AM',
      highlight: false
    },
    {
      icon: '/images/aarati_icon.png',
      title: 'Evening Aarti',
      time: '7:15 PM',
      highlight: false
    }
  ];

  return (
    <section className="aarti-section">
      <div className="container">
        <div className="live-updates">
          <div className="lotus-icon">🪷</div>
          <span className="live-text">LIVE UPDATES</span>
        </div>
        <h2 className="aarti-title">Daily Darshan & Aarti Schedule</h2>
        <div className="schedule-grid">
          <div className={`schedule-card ${scheduleCards[0].highlight ? 'highlight-card' : ''}`}>
            <div className="card-icon">
              <img src={scheduleCards[0].icon} alt={scheduleCards[0].title} className="card-icon-image" />
            </div>
            <h3 className="card-title">{scheduleCards[0].title}</h3>
            <p className="card-time">{scheduleCards[0].time}</p>
          </div>
          <div className={`schedule-card ${scheduleCards[1].highlight ? 'highlight-card' : ''}`}>
            <div className="card-icon">
              <img src={scheduleCards[1].icon} alt={scheduleCards[1].title} className="card-icon-image" />
            </div>
            <h3 className="card-title">{scheduleCards[1].title}</h3>
            <p className="card-time">{scheduleCards[1].time}</p>
          </div>
          <div className={`schedule-card ${scheduleCards[2].highlight ? 'highlight-card' : ''}`}>
            <div className="card-icon">
              <img src={scheduleCards[2].icon} alt={scheduleCards[2].title} className="card-icon-image" />
            </div>
            <h3 className="card-title">{scheduleCards[2].title}</h3>
            <p className="card-time">{scheduleCards[2].time}</p>
          </div>
          <div className={`schedule-card bottom-left ${scheduleCards[3].highlight ? 'highlight-card' : ''}`}>
            <div className="card-icon">
              <img src={scheduleCards[3].icon} alt={scheduleCards[3].title} className="card-icon-image" />
            </div>
            <h3 className="card-title">{scheduleCards[3].title}</h3>
            <p className="card-time">{scheduleCards[3].time}</p>
          </div>
          <div className={`schedule-card bottom-right ${scheduleCards[4].highlight ? 'highlight-card' : ''}`}>
            <div className="card-icon">
              <img src={scheduleCards[4].icon} alt={scheduleCards[4].title} className="card-icon-image" />
            </div>
            <h3 className="card-title">{scheduleCards[4].title}</h3>
            <p className="card-time">{scheduleCards[4].time}</p>
          </div>
        </div>
        <p className="schedule-note">Please Note - mandir timings may vary during festivals</p>
      </div>
    </section>
  );
};

export default AartiSchedule;

