import React from 'react';
import './MetricCard.scss';

const MetricCard = ({ label, value, subtext, icon: Icon, color }) => {
  return (
    <div className={`metric-card card ${color}`}>
      <div className="metric-content">
        <span className="label">{label}</span>
        <h2 className="value">{value}</h2>
        {subtext && <span className="subtext">{subtext}</span>}
      </div>
      <div className="metric-icon">
        <Icon size={24} />
      </div>
    </div>
  );
};

export default MetricCard;
