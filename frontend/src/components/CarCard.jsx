import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';
import './CarCard.scss';

const CarCard = ({ session }) => {
  return (
    <div className="car-card card">
      <div className="card-header">
        <div className="car-info">
          <h3>{session.car_model || 'Unknown Car'}</h3>
          <p className="plate">{session.plate_number}</p>
        </div>
        <span className={`badge ${session.status}`}>{session.status}</span>
      </div>

      <div className="card-body">
        <div className="info-row">
          <div className="label-val">
            <span className="label">Customer</span>
            <span className="value">{session.customer_name || 'Walk-in'}</span>
          </div>
          <div className="label-val">
            <span className="label">Valet</span>
            <div className="valet-info">
              <span className="value">{session.valet_name || 'Unassigned'}</span>
              {session.valet_name && <button className="icon-btn"><Phone size={14} /></button>}
            </div>
          </div>
        </div>

        <div className="meta-row">
          <div className="meta-item">
            <MapPin size={14} />
            <span>{session.location}</span>
          </div>
          <div className="meta-item">
            <Clock size={14} />
            <span>{new Date(session.entry_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <span className={`badge ${session.payment_status}`}>{session.payment_status}</span>
        </div>
      </div>

      {session.status === 'parked' && (
        <button className="primary-outline-btn w-full">Reassign Valet</button>
      )}
    </div>
  );
};

export default CarCard;
