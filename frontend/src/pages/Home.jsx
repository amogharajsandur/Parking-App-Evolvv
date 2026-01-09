import React from 'react';
import { QrCode, MapPin, Clock, ArrowRight } from 'lucide-react';
import './Home.scss';

const Home = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="user-profile">
          <div className="avatar">JD</div>
          <div className="welcome">
            <p>Welcome back,</p>
            <h3>John Doe</h3>
          </div>
        </div>
      </header>

      <section className="scan-section">
        <div className="scan-card">
          <div className="scan-info">
            <h2>Scan to Park</h2>
            <p>Find a valet and scan their QR code to start parking</p>
          </div>
          <div className="qr-icon-container">
            <QrCode size={48} />
          </div>
          <button className="scan-btn">
            Open Scanner <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <section className="recent-parking">
        <div className="section-header">
          <h2>Recent Parking</h2>
          <button className="text-btn">View All</button>
        </div>

        <div className="history-list">
          {[1, 2].map(i => (
            <div key={i} className="history-item card">
              <div className="icon">
                <MapPin size={20} />
              </div>
              <div className="info">
                <h4>Infiniti Mall, Mumbai</h4>
                <p>Tesla Model 3 • MH01AB1234</p>
                <div className="details">
                  <span className="date">Oct 24, 2025</span>
                  <span className="dot">•</span>
                  <span className="duration">2h 15m</span>
                </div>
              </div>
              <div className="amount">
                <span>₹150</span>
                <span className="badge paid">Paid</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
