import React from 'react';
import { History as HistoryIcon, MapPin, ChevronRight } from 'lucide-react';
import './History.scss';

const History = () => {
  const historyItems = [
    { id: 1, location: 'Infiniti Mall, Mumbai', car: 'Tesla Model 3', plate: 'MH01AB1234', date: 'Oct 24, 2025', duration: '2h 15m', amount: '₹150', status: 'paid' },
    { id: 2, location: 'Phoenix Marketcity, Pune', car: 'Audi A4', plate: 'MH12CD5678', date: 'Oct 22, 2025', duration: '1h 30m', amount: '₹100', status: 'paid' },
    { id: 3, location: 'DLF CyberHub, Gurgaon', car: 'Range Rover Evoque', plate: 'DL4CAS5678', date: 'Oct 20, 2025', duration: '4h 45m', amount: '₹450', status: 'paid' },
  ];

  return (
    <div className="history-page">
      <header className="history-header">
        <h1>Parking History</h1>
      </header>

      <div className="history-list">
        {historyItems.map(item => (
          <div key={item.id} className="history-item card">
            <div className="icon">
              <MapPin size={20} />
            </div>
            <div className="info">
              <div className="header">
                <h3>{item.location}</h3>
                <span className="amount">{item.amount}</span>
              </div>
              <p>{item.car} • {item.plate}</p>
              <div className="footer">
                <span className="date">{item.date}</span>
                <span className="dot">•</span>
                <span className="duration">{item.duration}</span>
                <span className={`badge ${item.status}`}>{item.status}</span>
              </div>
            </div>
            <div className="action">
              <ChevronRight size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
