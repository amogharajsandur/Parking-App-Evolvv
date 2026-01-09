import React, { useState } from 'react';
import { Truck, MapPin, User, Clock, Phone, CheckCircle } from 'lucide-react';
import './ValetView.scss';

const ValetView = () => {
  const [activeTask, setActiveTask] = useState({
    id: '1',
    type: 'Parking',
    carModel: 'Range Rover Evoque',
    plate: 'DL4CAS5678',
    customer: 'Sarah Smith',
    location: 'Level 2 - B34',
    time: '12:45 PM',
    status: 'pending'
  });

  return (
    <div className="valet-page">
      <header className="valet-header">
        <h1>Active Assignment</h1>
        <div className="status-indicator available">
          <span>Available</span>
        </div>
      </header>

      {activeTask ? (
        <div className="task-container">
          <div className="task-card card">
            <div className="type-badge">
              <Truck size={16} />
              <span>{activeTask.type} Request</span>
            </div>

            <div className="car-details">
              <h2>{activeTask.carModel}</h2>
              <p className="plate">{activeTask.plate}</p>
            </div>

            <div className="customer-info">
              <div className="item">
                <User size={18} />
                <div className="text">
                  <span>Customer</span>
                  <p>{activeTask.customer}</p>
                </div>
                <button className="icon-btn call"><Phone size={18} /></button>
              </div>
              
              <div className="item">
                <MapPin size={18} />
                <div className="text">
                  <span>Parking Slot</span>
                  <p>{activeTask.location}</p>
                </div>
              </div>

              <div className="item">
                <Clock size={18} />
                <div className="text">
                  <span>Assigned At</span>
                  <p>{activeTask.time}</p>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              {activeTask.status === 'pending' ? (
                <button className="primary w-full" onClick={() => setActiveTask({...activeTask, status: 'in-progress'})}>
                  Accept Assignment
                </button>
              ) : (
                <button className="success-btn w-full" onClick={() => setActiveTask(null)}>
                  <CheckCircle size={20} />
                  Complete Parking
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <Truck size={48} />
          <h3>No New Tasks</h3>
          <p>You'll be notified when a new parking or retrieval task is assigned to you.</p>
        </div>
      )}
    </div>
  );
};

export default ValetView;
